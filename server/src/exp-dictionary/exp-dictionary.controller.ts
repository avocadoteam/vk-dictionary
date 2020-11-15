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
import { WordFrequencyService } from 'src/word-frequency/word-frequency.service';
import { ExpDictionaryService } from './exp-dictionary.service';

@Controller('api/exp-dictionary')
@UseGuards(SignGuard)
@UseInterceptors(TransformInterceptor)
export class ExpDictionaryController {
  constructor(
    private readonly expDictService: ExpDictionaryService,
    private readonly wordFreqService: WordFrequencyService,
  ) {}

  @Get()
  testSearch(
    @Query()
    model: SearchModel,
  ) {
    return this.expDictService.fullTextSearch(
      model.query?.replace(/\s/g, '') ?? '',
    );
  }

  @Get('/freq-words')
  getMostFrequentWords() {
    return this.wordFreqService.getMostFreqWords();
  }
}
