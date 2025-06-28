import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RafflesModule } from './raffles-senna/raffles.module';
import { RafflesQuinceModule } from './raffles-quince/raffles-quince.module';

@Module({
  imports: [RafflesModule, RafflesQuinceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
