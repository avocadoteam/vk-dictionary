import { Test, TestingModule } from '@nestjs/testing';
import { UserFavouriteController } from './user-favourite.controller';

describe('UserFavouriteController', () => {
  let controller: UserFavouriteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserFavouriteController],
    }).compile();

    controller = module.get<UserFavouriteController>(UserFavouriteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
