import { MigrationInterface, QueryRunner } from 'typeorm';

export class FavouritesPK1605652415006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      alter table user_favourite drop constraint user_favourite_pkey;
      alter table user_favourite alter column dictionary_id set not null;
      alter table user_favourite add primary key (vk_id, dictionary_id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
