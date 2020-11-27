import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteNotParsedVal1606480804027 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      delete
      from
        user_favourite
      where
        dictionary_id in (
        select
          uf.dictionary_id
        from
          user_favourite uf
        inner join dictionary d on
          d.id = uf.dictionary_id
          and position('<b>' in d.definition) = 1);
      
      delete
      from
        photo
      where
        dictionary_id in (
        select
          uf.dictionary_id
        from
          photo uf
        inner join dictionary d on
          d.id = uf.dictionary_id
          and position('<b>' in d.definition) = 1);
      
      delete
      from
        word_frequency
      where
        exp_dict_id in (
        select
          uf.exp_dict_id
        from
          word_frequency uf
        inner join dictionary d on
          d.id = uf.exp_dict_id
          and position('<b>' in d.definition) = 1);
      
      delete
      from
        dictionary
      where
        position('<b>' in definition) = 1;
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
