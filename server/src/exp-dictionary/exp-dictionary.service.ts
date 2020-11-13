import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dictionary } from 'src/db/tables/Dictionary';
import { Repository } from 'typeorm';

@Injectable()
export class ExpDictionaryService {
  private readonly logger = new Logger(ExpDictionaryService.name);

  constructor(
    @InjectRepository(Dictionary)
    private tableDict: Repository<Dictionary>,
  ) {}

  async fullTextSearch(query: string) {
    const r = await this.tableDict.query(`
      select
        id,
        name,
        definition
      from
        (
        select
          id,
          name,
          definition,
          (
            setweight(to_tsvector(ts_config_name, name_plain_text), 'A') || 
            setweight(to_tsvector(ts_config_name, definition), 'B')
          ) as document
        from
          dictionary ) ps
      where
        ps.document @@ to_tsquery('${query}:*');
    `);

    this.logger.log(r);
  }
}
