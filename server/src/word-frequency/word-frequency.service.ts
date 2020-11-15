import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WordFrequency } from 'src/db/tables/WordFrequency';
import { errMap } from 'src/utils/errors';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class WordFrequencyService {
  private readonly logger = new Logger(WordFrequencyService.name);

  constructor(
    @InjectRepository(WordFrequency)
    private tableFreq: Repository<WordFrequency>,
    private connection: Connection,
  ) {}

  async incrementFrequency(ids: string[]) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const wordId of ids) {
        const wFreq = await queryRunner.manager.findOne<WordFrequency>(
          WordFrequency,
          {
            where: { expDict: { id: wordId } },
          },
        );

        if (wFreq) {
          wFreq.frequency += 1;
          await queryRunner.manager.save(wFreq);
        } else {
          const neWFreq = new WordFrequency(1, wordId);
          await queryRunner.manager.save(neWFreq);
        }
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      this.logger.error(errMap(err));
      await queryRunner.rollbackTransaction();
      throw new Error(err);
    } finally {
      await queryRunner.release();
    }
  }
}
