import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1605255203784 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create function schema_create_fk_constraint(table_name text, column_name text, foreign_table_name text, foreign_column_name text) returns void as $$
        declare sql_text text;
        begin sql_text := format ('alter table %s add constraint fk_%s_%s foreign key (%s) references %s(%s)',
                                  table_name, table_name, column_name, column_name, foreign_table_name, foreign_column_name); execute sql_text;
        end
      $$ language plpgsql;

      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      create or replace function array_diff(array1 anyarray, array2 anyarray)
      returns anyarray language sql immutable as $$
          select coalesce(array_agg(elem), '{}')
          from unnest(array1) elem
          where elem <> all(array2)
      $$;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
