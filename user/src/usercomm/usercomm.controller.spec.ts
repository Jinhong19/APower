import { Test, TestingModule } from '@nestjs/testing';
import { UsercommController } from './usercomm.controller';

describe('CommuserController', () => {
  let controller: UsercommController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsercommController],
    }).compile();

    controller = module.get<UsercommController>(UsercommController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
