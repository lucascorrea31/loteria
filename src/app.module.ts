import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RafflesModule } from './raffles/raffles.module';

@Module({
  imports: [RafflesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
