import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dictionary } from 'src/db/tables/Dictionary';
import { Photo } from 'src/db/tables/Photo';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';
import { PhotoCheckService } from './photo-check.service';
import { WordPhotoService } from './word-photo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Photo, Dictionary]),
    HttpModule,
    RedisCacheModule,
  ],
  providers: [WordPhotoService, PhotoCheckService],
  exports: [WordPhotoService],
})
export class WordPhotoModule {}
