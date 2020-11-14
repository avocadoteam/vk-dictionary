import {MigrationInterface, QueryRunner} from "typeorm";

export class TextSearch1605257114802 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        CREATE EXTENSION unaccent;
        CREATE TEXT SEARCH CONFIGURATION ru ( COPY = russian );
        ALTER TEXT SEARCH CONFIGURATION ru ALTER MAPPING
        FOR hword, hword_part, word WITH unaccent, russian_stem;

        alter table dictionary add column ts_config_name regconfig;

        create index dictionary_name_idx on dictionary using gin(to_tsvector(ts_config_name, name));
        create index dictionary_definition_idx on dictionary using gin(to_tsvector(ts_config_name, definition));
        create index dictionary_all_search on dictionary
          using gin(
            (
              setweight(to_tsvector(ts_config_name, name), 'A') || 
              setweight(to_tsvector(ts_config_name, definition), 'B')
            ));
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
