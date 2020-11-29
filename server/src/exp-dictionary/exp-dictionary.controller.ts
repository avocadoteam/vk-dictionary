import {
  Controller,
  Get,
  NotFoundException,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { WordPhotoModel } from 'src/contracts/photos';
import { SearchModel } from 'src/contracts/search';
import { SignGuard } from 'src/guards/sign.guard';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { WordFrequencyService } from 'src/word-frequency/word-frequency.service';
import { WordPhotoService } from 'src/word-photo/word-photo.service';
import { ExpDictionaryService } from './exp-dictionary.service';

@Controller('api/exp-dictionary')
@UseGuards(SignGuard)
@UseInterceptors(TransformInterceptor)
export class ExpDictionaryController {
  constructor(
    private readonly expDictService: ExpDictionaryService,
    private readonly wordFreqService: WordFrequencyService,
    private readonly wordPhotoService: WordPhotoService,
  ) {}

  @Get()
  testSearch(
    @Query()
    model: SearchModel,
  ) {
    return this.expDictService.fullTextSearch(
      model.query?.replace(/\s/g, '').toLowerCase() ?? '',
    );
  }

  @Get('/freq-words')
  getMostFrequentWords() {
    return this.wordFreqService.getMostFreqWords();
  }

  @Get('/photos')
  getPhotosForWord(@Query() model: WordPhotoModel) {
    return this.wordPhotoService.getWordPhoto(model.wordId);
  }

  @Get('/word')
  async getWord(@Query() model: WordPhotoModel) {
    const word = await this.expDictService.getWordInfo(model.wordId);

    if (!word) {
      throw new NotFoundException();
    }
    return word;
  }

  @Get('/word-day')
  getWordOfTheDay() {
    return this.wordPhotoService.getRandomWordWithPhoto();
  }
}
