import { Test, TestingModule } from '@nestjs/testing';
import { VkApiService } from './vk-api.service';

describe('VkApiService', () => {
  let service: VkApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VkApiService],
    }).compile();

    service = module.get<VkApiService>(VkApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
