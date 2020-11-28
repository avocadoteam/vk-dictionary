import {
  CACHE_MANAGER,
  HttpService,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { cacheKey, monthTTL } from 'src/contracts/cache';
import { WordPhoto } from 'src/contracts/photos';
import { CacheManager } from 'src/custom-types/cache';
import { Photo } from 'src/db/tables/Photo';
import { errMap } from 'src/utils/errors';
import { Repository } from 'typeorm';

@Injectable()
export class PhotoCheckService {
  private readonly logger = new Logger(PhotoCheckService.name);

  constructor(
    @InjectRepository(Photo)
    private tablePhoto: Repository<Photo>,
    @Inject(CACHE_MANAGER) private cache: CacheManager,
    private readonly httpService: HttpService,
  ) {}

  async checkPhotos(photos: WordPhoto[]) {
    const verifiedIds = await this.cache.get<number[]>(
      cacheKey.verifiedPhotoIds,
    );

    const photosToCheck = verifiedIds
      ? photos.filter((p) => !verifiedIds.includes(p.id!))
      : photos;

    if (photosToCheck.length) {
      await this.cache.set(
        cacheKey.verifiedPhotoIds,
        verifiedIds
          ? [...verifiedIds, ...photosToCheck.map((p) => p.id)]
          : photosToCheck.map((p) => p.id),
        {
          ttl: monthTTL,
        },
      );

      photosToCheck.forEach(async (p) => {
        const found = await this.canPhotoBeFound(p.url);

        if (!found && p.id !== null) {
          this.logger.log(`sending photo to delete`);
          this.deletePhoto(p.id);
        }
      });
    }
  }

  private async canPhotoBeFound(url: string) {
    try {
      const result = await this.httpService.get(url).toPromise();
      return result.status !== HttpStatus.NOT_FOUND;
    } catch (error) {
      this.logger.log(`canPhotoBeFound error`);
      this.logger.error(errMap(error));
      return true;
    }
  }

  private async deletePhoto(id: number) {
    await this.tablePhoto.delete(id);
  }
}
