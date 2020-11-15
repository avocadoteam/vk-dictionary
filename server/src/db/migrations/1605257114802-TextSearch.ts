import {MigrationInterface, QueryRunner} from "typeorm";

export class TextSearch1605257114802 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        alter table dictionary add column ts_config_name regconfig, add column definition_plain_text text;

        CREATE UNIQUE INDEX dict_name_uniq_ids ON dictionary (name);
        create index dictionary_name_idx on dictionary using gin(to_tsvector(ts_config_name, name));
        create index dictionary_definition_idx on dictionary using gin(to_tsvector(ts_config_name, definition_plain_text));
        create index dictionary_all_search on dictionary
          using gin(
            (
              setweight(to_tsvector(ts_config_name, name), 'A') || 
              setweight(to_tsvector(ts_config_name, definition_plain_text), 'B')
            ));
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
