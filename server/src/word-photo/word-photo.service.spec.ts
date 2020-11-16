import { Test, TestingModule } from '@nestjs/testing';
import { WordPhotoService } from './word-photo.service';

describe('WordPhotoService', () => {
  let service: WordPhotoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordPhotoService],
    }).compile();

    service = module.get<WordPhotoService>(WordPhotoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
