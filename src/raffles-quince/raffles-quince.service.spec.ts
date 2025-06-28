import { Test, TestingModule } from '@nestjs/testing';
import { RafflesQuinceService } from './raffles-quince.service';

describe('RafflesQuinceService', () => {
  let service: RafflesQuinceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RafflesQuinceService],
    }).compile();

    service = module.get<RafflesQuinceService>(RafflesQuinceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
