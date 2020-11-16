import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dictionary } from 'src/db/tables/Dictionary';
import { Photo } from 'src/db/tables/Photo';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';
import { WordPhotoService } from './word-photo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Photo, Dictionary]),
    HttpModule,
    RedisCacheModule,
  ],
  providers: [WordPhotoService],
  exports: [WordPhotoService],
})
export class WordPhotoModule {}
