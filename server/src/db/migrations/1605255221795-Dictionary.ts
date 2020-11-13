import { MigrationInterface, QueryRunner } from 'typeorm';

export class Dictionary1605255221795 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table if not exists dictionary (
        id bigserial,
        name text not null,
        definition text not null,
        primary key (id)
      );

      create table if not exists photo (
        id serial,
        url text not null,
        dictionary_id int8 not null,
        primary key (id)
      );

      select schema_create_fk_constraint('photo', 'dictionary_id', 'dictionary', 'id');
      create index photo_dictionary_id_idx on photo (dictionary_id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
