import { Test, TestingModule } from '@nestjs/testing';
import { ExpDictionaryService } from './exp-dictionary.service';

describe('ExpDictionaryService', () => {
  let service: ExpDictionaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpDictionaryService],
    }).compile();

    service = module.get<ExpDictionaryService>(ExpDictionaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
