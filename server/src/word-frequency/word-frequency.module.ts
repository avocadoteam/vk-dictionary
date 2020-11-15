import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordFrequency } from 'src/db/tables/WordFrequency';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';
import { WordFrequencyService } from './word-frequency.service';

@Module({
  imports: [TypeOrmModule.forFeature([WordFrequency]), RedisCacheModule],
  providers: [WordFrequencyService],
  exports: [WordFrequencyService],
})
export class WordFrequencyModule {}
