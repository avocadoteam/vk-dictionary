import { Module } from '@nestjs/common';
import { UserFavouriteService } from './user-favourite.service';
import { UserFavouriteController } from './user-favourite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFavourite } from 'src/db/tables/UserFavourite';

@Module({
  imports: [TypeOrmModule.forFeature([UserFavourite])],
  providers: [UserFavouriteService],
  controllers: [UserFavouriteController],
})
export class UserFavouriteModule {}
