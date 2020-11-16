import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dictionary } from 'src/db/tables/Dictionary';
import { WordFrequencyModule } from 'src/word-frequency/word-frequency.module';
import { WordPhotoModule } from 'src/word-photo/word-photo.module';
import { ExpDictionaryController } from './exp-dictionary.controller';
import { ExpDictionaryService } from './exp-dictionary.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dictionary]),
    WordFrequencyModule,
    WordPhotoModule,
  ],
  providers: [ExpDictionaryService],
  controllers: [ExpDictionaryController],
})
export class ExpDictionaryModule {}
