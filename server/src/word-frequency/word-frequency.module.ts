import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordFrequency } from 'src/db/tables/WordFrequency';
import { WordFrequencyService } from './word-frequency.service';

@Module({
  imports: [TypeOrmModule.forFeature([WordFrequency])],
  providers: [WordFrequencyService],
  exports: [WordFrequencyService],
})
export class WordFrequencyModule {}
