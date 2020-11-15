import {
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SearchModel } from 'src/contracts/search';
import { SignGuard } from 'src/guards/sign.guard';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { ExpDictionaryService } from './exp-dictionary.service';

@Controller('api/exp-dictionary')
@UseGuards(SignGuard)
@UseInterceptors(TransformInterceptor)
export class ExpDictionaryController {
  constructor(private readonly expDictService: ExpDictionaryService) {}

  @Get()
  testSearch(
    @Query()
    model: SearchModel,
  ) {
    return this.expDictService.fullTextSearch(model.query);
  }
}
