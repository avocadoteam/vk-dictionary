import { Test, TestingModule } from '@nestjs/testing';
import { UserFavouriteService } from './user-favourite.service';

describe('UserFavouriteService', () => {
  let service: UserFavouriteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFavouriteService],
    }).compile();

    service = module.get<UserFavouriteService>(UserFavouriteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
