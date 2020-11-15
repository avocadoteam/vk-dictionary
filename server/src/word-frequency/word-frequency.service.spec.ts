import { Test, TestingModule } from '@nestjs/testing';
import { WordFrequencyService } from './word-frequency.service';

describe('WordFrequencyService', () => {
  let service: WordFrequencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordFrequencyService],
    }).compile();

    service = module.get<WordFrequencyService>(WordFrequencyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
