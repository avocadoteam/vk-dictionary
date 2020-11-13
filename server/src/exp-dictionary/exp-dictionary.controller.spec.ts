import { Test, TestingModule } from '@nestjs/testing';
import { ExpDictionaryController } from './exp-dictionary.controller';

describe('ExpDictionaryController', () => {
  let controller: ExpDictionaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpDictionaryController],
    }).compile();

    controller = module.get<ExpDictionaryController>(ExpDictionaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
