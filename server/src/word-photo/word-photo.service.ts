import {
  CACHE_MANAGER,
  HttpService,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import integrationConfig from 'src/config/integration.config';
import { cacheKey } from 'src/contracts/cache';
import {
  SplashPhoto,
  SplashPhotoResult,
  WordPhoto,
} from 'src/contracts/photos';
import { CacheManager } from 'src/custom-types/cache';
import { Dictionary } from 'src/db/tables/Dictionary';
import { Photo } from 'src/db/tables/Photo';
import { buildQueryString } from 'src/utils/api';
import { errMap } from 'src/utils/errors';
import { Repository, Connection } from 'typeorm';

@Injectable()
export class WordPhotoService {
  private readonly logger = new Logger(WordPhotoService.name);

  constructor(
    @InjectRepository(Photo)
    private tablePhoto: Repository<Photo>,
    @InjectRepository(Dictionary)
    private tableDict: Repository<Dictionary>,
    private connection: Connection,
    private readonly httpService: HttpService,
    @Inject(integrationConfig.KEY)
    private config: ConfigType<typeof integrationConfig>,
    @Inject(CACHE_MANAGER) private cache: CacheManager,
  ) {}

  async getWordPhoto(wordId: string): Promise<WordPhoto[]> {
    const dict = await this.tableDict.findOne(wordId, { select: ['name'] });

    if (!dict) {
      this.logger.warn(`No dictionary word with id ${wordId}`);
      return [];
    }

    const savedPhotos = await this.tablePhoto
      .createQueryBuilder('photo')
      .innerJoin('photo.dictionary', 'dict', `photo.dictionary_id = ${wordId}`)
      .getMany();

    if (!savedPhotos?.length) {
      const newPhotosFromUnsplash = await this.fetchPhotos(dict.name);
      this.logger.debug(
        `Amount of photos to save ${newPhotosFromUnsplash?.length ?? 0}`,
      );

      this.saveNewSplashPhotos(newPhotosFromUnsplash, wordId);

      return newPhotosFromUnsplash.map((v) => ({
        blurHash: v.blur_hash,
        color: v.color,
        url: v.urls.regular ?? v.urls.small,
        userLink: v.user.links.html,
        userName: v.user.name,
      }));
    }

    return savedPhotos.map((f) => ({
      blurHash: f.blur_hash,
      color: f.color,
      url: f.url_regular,
      userLink: f.user_link,
      userName: f.user_name,
    }));
  }

  private async fetchPhotos(query: string) {
    const remainingSavedAttempts = await this.cache.get<number>(
      cacheKey.splashAttemptsToFetchPhotos,
    );

    if (remainingSavedAttempts !== null && remainingSavedAttempts === 0) {
      this.logger.log(`fetchPhotos failed no remaining attempts`);
      return [];
    }

    const result = await this.httpService
      .get<SplashPhoto>(
        `https://api.unsplash.com/search/photos${buildQueryString([
          { client_id: this.config.splashAccessKey ?? '' },
          { query },
          { orientation: 'portrait' },
          { lang: 'ru' },
          { per_page: '5' },
        ])}`,
      )
      .toPromise();

    if (result.data.error) {
      this.logger.log(`fetchPhotos failed ${result.data.error?.error_msg}`);
      return [];
    }
    const remainingAttempts = result.headers['x-ratelimit-remaining'];

    await this.cache.set(
      cacheKey.splashAttemptsToFetchPhotos,
      remainingAttempts,
      {},
    );

    return result.data.results;
  }

  private async saveNewSplashPhotos(
    photos: SplashPhotoResult[],
    wordId: string,
  ) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const newUnsplashPhoto of photos) {
        const photoExists = await queryRunner.manager.findOne<Photo>(Photo, {
          where: { splash_id: newUnsplashPhoto.id },
        });

        if (photoExists) {
          continue;
        } else {
          const newPhoto = new Photo(
            newUnsplashPhoto.urls.regular ?? newUnsplashPhoto.urls.small,
            wordId,
            newUnsplashPhoto.urls.full ?? newUnsplashPhoto.urls.raw,
            newUnsplashPhoto.user.name,
            newUnsplashPhoto.user.links.html,
            newUnsplashPhoto.color,
            newUnsplashPhoto.blur_hash,
            newUnsplashPhoto.id,
          );
          await queryRunner.manager.save(newPhoto);
        }
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      this.logger.error(errMap(err));
      await queryRunner.rollbackTransaction();
      throw new Error(err);
    } finally {
      await queryRunner.release();
    }
  }
}
