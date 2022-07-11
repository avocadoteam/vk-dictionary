import { HttpModule, Module } from '@nestjs/common';
import { UserFavouriteService } from './user-favourite.service';
import { UserFavouriteController } from './user-favourite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFavourite } from 'src/db/tables/UserFavourite';
import { Dictionary } from 'src/db/tables/Dictionary';
import { UserPaymentService } from './user-payment';

@Module({
  imports: [TypeOrmModule.forFeature([UserFavourite, Dictionary]), HttpModule],
  providers: [UserFavouriteService, UserPaymentService],
  controllers: [UserFavouriteController],
})
export class UserFavouriteModule {}
