import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  NotFoundException,
  ParseIntPipe,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FavouriteModel } from 'src/contracts/favourite';
import { SignGuard } from 'src/guards/sign.guard';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { errMap } from 'src/utils/errors';
import { UserFavouriteService } from './user-favourite.service';

@Controller('api/user-favourite')
@UseGuards(SignGuard)
@UseInterceptors(TransformInterceptor)
export class UserFavouriteController {
  private readonly logger = new Logger(UserFavouriteController.name);
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
  async toggleFavourite(
    @Query(
      'vk_user_id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    vkUserId: number,
    @Body()
    model: FavouriteModel,
  ) {
    try {
      if (!(await this.ufService.wordExists(model.wordId))) {
        throw new NotFoundException();
      }

      return this.ufService.setUserFavourite(`${vkUserId}`, model.wordId);
    } catch (error) {
      this.logger.error(errMap(error));
      throw new BadRequestException();
    }
  }
}
