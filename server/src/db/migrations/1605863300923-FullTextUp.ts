import { MigrationInterface, QueryRunner } from 'typeorm';

export class FullTextUp1605863300923 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        update dictionary set ts_config_name = 'english';
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
