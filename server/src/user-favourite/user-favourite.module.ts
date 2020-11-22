import { Module } from '@nestjs/common';
import { UserFavouriteService } from './user-favourite.service';
import { UserFavouriteController } from './user-favourite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFavourite } from 'src/db/tables/UserFavourite';
import { Dictionary } from 'src/db/tables/Dictionary';

@Module({
  imports: [TypeOrmModule.forFeature([UserFavourite, Dictionary])],
  providers: [UserFavouriteService],
  controllers: [UserFavouriteController],
})
export class UserFavouriteModule {}
