import { MigrationInterface, QueryRunner } from 'typeorm';

export class Favourites1605472390822 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table if not exists user_favourite (
        vk_id int8 not null,
        deleted timestamp,
        dictionary_id int8,
        primary key (vk_id)
      );

      select schema_create_fk_constraint('user_favourite', 'dictionary_id', 'dictionary', 'id');
      create index user_favourite_dictionary_id_idx on user_favourite (dictionary_id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
