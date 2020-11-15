import { MigrationInterface, QueryRunner } from 'typeorm';

export class WordFreq1605439316267 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table if not exists word_frequency (
        id bigserial,
        frequency int4 not null,
        exp_dict_id int8,
        primary key (id)
      );

      select schema_create_fk_constraint('word_frequency', 'exp_dict_id', 'dictionary', 'id');
      create index word_frequency_dictionary_id_idx on word_frequency (exp_dict_id);
      create index word_frequency_frequency_idx on word_frequency (frequency DESC NULLS LAST);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
