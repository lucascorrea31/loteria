import { Module } from '@nestjs/common';
import { RafflesQuinceController } from './raffles-quince.controller';
import { RafflesQuinceService } from './raffles-quince.service';

@Module({
  controllers: [RafflesQuinceController],
  providers: [RafflesQuinceService],
})
export class RafflesQuinceModule {}
