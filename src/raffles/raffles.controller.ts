import { Controller, Get, Header, Param, Query } from '@nestjs/common';
import { RafflesService } from './raffles.service';

@Controller('raffles')
export class RafflesController {
  constructor(private readonly service: RafflesService) {}

  @Get('repeatest-numbers/:n?')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Content-Type', 'application/json')
  @Header('Accept', 'application/json')
  getRepeatestRaffleNumbers(@Param('n') n?: number | undefined): string {
    return JSON.stringify(this.service.getRepeatestRaffleNumbers(n));
  }

  @Get('repeatest-linked-numbers')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Content-Type', 'application/json')
  @Header('Accept', 'application/json')
  getRepeatestLinkedRaffleNumbers(): string {
    return JSON.stringify(this.service.getRepeatestLinkedRaffleNumbers());
  }

  @Get('compare-numbers')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Content-Type', 'application/json')
  @Header('Accept', 'application/json')
  getCompareNumbers(
    @Query('index') index?: number | undefined,
    @Query('offset') offset?: number | undefined,
  ): string {
    if (!index) {
      index = 500;
    }
    if (!offset) {
      offset = 0;
    }

    const json = {
      offset: offset,
      index: index,
      linked: {
        linkedRenew: this.service.testLinkedNumbers(index, offset, true),
        linked: this.service.testLinkedNumbers(index, offset, false),
      },
      repeatest: {
        repeatest6: this.service.testRepeatestNumbers(index, offset, 6, false),
        repeatest7: this.service.testRepeatestNumbers(index, offset, 7, false),
        repeatest8: this.service.testRepeatestNumbers(index, offset, 8, false),
        // repeatest9: this.service.testRepeatestNumbers(index, offset, 9, false),
      },
      repeatestRenew: {
        repeatestRenew6: this.service.testRepeatestNumbers(
          index,
          offset,
          6,
          true,
        ),
        repeatestRenew7: this.service.testRepeatestNumbers(
          index,
          offset,
          7,
          true,
        ),
        repeatestRenew8: this.service.testRepeatestNumbers(
          index,
          offset,
          8,
          true,
        ),
        // repeatestRenew9: this.service.testRepeatestNumbers(index, offset, 9, true),
      },
      random: {
        random6: this.service.testRandomNumbers(6, false),
        random7: this.service.testRandomNumbers(7, false),
        random8: this.service.testRandomNumbers(8, false),
        // random9: this.service.testRandomNumbers(9, false),
      },
      randomRenew: {
        randomRenew6: this.service.testRandomNumbers(6, true),
        randomRenew7: this.service.testRandomNumbers(7, true),
        randomRenew8: this.service.testRandomNumbers(8, true),
        // randomRenew9: this.service.testRandomNumbers(9, true),
      },
    };

    return JSON.stringify(json);
  }
}
