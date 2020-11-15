import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchResult } from 'src/contracts/search';
import { UserFavourite } from 'src/db/tables/UserFavourite';
import { errMap } from 'src/utils/errors';
import { Repository, Connection } from 'typeorm';

@Injectable()
export class UserFavouriteService {
  private readonly logger = new Logger(UserFavouriteService.name);

  constructor(
    @InjectRepository(UserFavourite)
    private tableUserFav: Repository<UserFavourite>,
    private connection: Connection,
  ) {}

  async getUserFavourites(vkUserId: string) {
    const r = (await this.tableUserFav.query(`
      select  
        ed.id,
        ed.definition
      from user_favourite uf 
      inner join dictionary ed on ed.id = uf.dictionary_id
      where uf.vk_id = ${vkUserId};
    `)) as SearchResult[];
    return r;
  }

  async setUserFavourite(vkUserId: string, wordId: string) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    let active = true;
    try {
      const uF = await queryRunner.manager.findOne<UserFavourite>(
        UserFavourite,
        {
          where: { expDict: { id: wordId }, vk_id: vkUserId },
        },
      );

      if (uF) {
        uF.deleted = uF.deleted ? null : new Date();
        active = !uF.deleted;
        await queryRunner.manager.save(uF);
      } else {
        const neUF = new UserFavourite(wordId, vkUserId, null);
        await queryRunner.manager.save(neUF);
      }

      await queryRunner.commitTransaction();
      return active;
    } catch (err) {
      this.logger.error(errMap(err));
      await queryRunner.rollbackTransaction();
      throw new Error(err);
    } finally {
      await queryRunner.release();
    }
  }
}
