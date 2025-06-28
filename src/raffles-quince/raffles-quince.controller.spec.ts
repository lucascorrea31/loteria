import { Test, TestingModule } from '@nestjs/testing';
import { RafflesQuinceController } from './raffles-quince.controller';

describe('RafflesQuinceController', () => {
  let controller: RafflesQuinceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RafflesQuinceController],
    }).compile();

    controller = module.get<RafflesQuinceController>(RafflesQuinceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
