import {
  Body,
  Controller,
  Get,
  HttpStatus,
  ParseIntPipe,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FavouriteModel } from 'src/contracts/favourite';
import { SignGuard } from 'src/guards/sign.guard';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { UserFavouriteService } from './user-favourite.service';

@Controller('api/user-favourite')
@UseGuards(SignGuard)
@UseInterceptors(TransformInterceptor)
export class UserFavouriteController {
  constructor(private readonly ufService: UserFavouriteService) {}

  @Get()
  getFavourites(
    @Query(
      'vk_user_id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    vkUserId: number,
  ) {
    return this.ufService.getUserFavourites(`${vkUserId}`);
  }

  @Put()
  toggleFavourite(
    @Query(
      'vk_user_id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    vkUserId: number,
    @Body()
    model: FavouriteModel,
  ) {
    return this.ufService.setUserFavourite(`${vkUserId}`, model.wordId);
  }
}
