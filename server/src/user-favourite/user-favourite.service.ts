import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavSearchResult } from 'src/contracts/search';
import { Dictionary } from 'src/db/tables/Dictionary';
import { UserFavourite } from 'src/db/tables/UserFavourite';
import { PaymentRequiredException } from 'src/exceptions/Payment.exception';
import { errMap } from 'src/utils/errors';
import { Connection, Repository } from 'typeorm';
import { UserPaymentService } from './user-payment';

@Injectable()
export class UserFavouriteService {
  private readonly logger = new Logger(UserFavouriteService.name);

  constructor(
    @InjectRepository(UserFavourite)
    private tableUserFav: Repository<UserFavourite>,
    @InjectRepository(Dictionary)
    private tableDict: Repository<Dictionary>,
    private connection: Connection,
    private readonly ups: UserPaymentService
  ) {}

  async getUserFavourites(vkUserId: string) {
    let q = `
      select  
        ed.id,
        ed.definition,
        ed.name
      from user_favourite uf 
      inner join dictionary ed on ed.id = uf.dictionary_id
      where uf.vk_id = ${vkUserId} and deleted is null
    `

    const isPremium = await this.ups.hasUserAvocadoPlus(vkUserId);

    q += isPremium ? ';' : ' limit 5;' 

    const r = (await this.tableUserFav.query(q)) as FavSearchResult[];
    return r;
  }

  async setUserFavourite(vkUserId: string, wordId: string) {
    const isPremium = await this.ups.hasUserAvocadoPlus(vkUserId);
    const allFavourites = await this.getUserFavourites(vkUserId);

    if (allFavourites.length >= 5 && !isPremium) {
      throw new PaymentRequiredException();
    }

    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    let active = true;
    try {
      const uF = (await queryRunner.manager.query(`
        select * from user_favourite where vk_id = ${vkUserId} and dictionary_id = ${wordId};
      `)) as UserFavourite[];

      const firstUF = uF[0];
      if (firstUF) {
        await queryRunner.manager.query(`
          update user_favourite set deleted = ${
            firstUF.deleted ? null : 'now()'
          } where vk_id = ${vkUserId} and dictionary_id = ${wordId};
        `);
      } else {
        await queryRunner.manager.query(`
          insert into user_favourite (vk_id, dictionary_id) values (${vkUserId}, ${wordId});
        `);
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

  async wordExists(wordId: string) {
    return (await this.tableDict.count({ where: { id: wordId } })) > 0;
  }
}
