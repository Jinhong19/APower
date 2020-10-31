import { Test, TestingModule } from '@nestjs/testing';
import { UsercommService } from './usercomm.service';

describe('UsercommService', () => {
  let service: UsercommService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsercommService],
    }).compile();

    service = module.get<UsercommService>(UsercommService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
