import { MigrationInterface, QueryRunner } from 'typeorm';

export class Photos1605513954539 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      alter table photo rename column url to url_regular;

      alter table photo
        add column splash_id text not null,
        add column url_full text not null,
        add column user_name text not null,
        add column user_link text not null,
        add column color text,
        add column blur_hash text not null;

      create index photo_splash_id_idx on photo (splash_id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
