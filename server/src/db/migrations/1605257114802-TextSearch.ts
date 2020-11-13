import {MigrationInterface, QueryRunner} from "typeorm";

export class TextSearch1605257114802 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        alter table dictionary 
          add column name_plain_text text,
          add column ts_config_name regconfig;


        create index dictionary_name_plain_text_idx on dictionary using gin(to_tsvector(ts_config_name, name_plain_text));
        create index dictionary_definition_idx on dictionary using gin(to_tsvector(ts_config_name, definition));
        create index dictionary_all_search on dictionary
          using gin(
            (
              setweight(to_tsvector(ts_config_name, name_plain_text), 'A') || 
              setweight(to_tsvector(ts_config_name, definition), 'B')
            ));

      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
