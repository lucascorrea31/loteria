import { Controller, Get, Header, Param, Query } from '@nestjs/common';
import { RafflesQuinceService } from './raffles-quince.service';

@Controller('raffles-quince')
export class RafflesQuinceController {
  constructor(private readonly service: RafflesQuinceService) {}

  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Content-Type', 'text/html')
  @Header('Accept', 'text/html')
  getHello(): string {
    return this.service.getHello();
  }

  @Get('most-repeated-numbers/:n?')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Content-Type', 'application/json')
  @Header('Accept', 'application/json')
  getMostRepeatedRaffleNumbers(@Param('n') n?: number | undefined): string {
    return JSON.stringify(this.service.getMostRepeatedRaffleNumbers(n));
  }

  @Get('most-linked-repeated-numbers')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Content-Type', 'application/json')
  @Header('Accept', 'application/json')
  getMostLinkedRepeatedRaffleNumbers(): string {
    return JSON.stringify(this.service.getMostLinkedRepeatedRaffleNumbers());
  }

  @Get('least-repeated-numbers/:n?')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Content-Type', 'application/json')
  @Header('Accept', 'application/json')
  getLeastRepeatedRaffleNumbers(@Param('n') n?: number | undefined): string {
    return JSON.stringify(this.service.getLeastRepeatedRaffleNumbers(n));
  }

  @Get('least-linked-repeated-numbers')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Content-Type', 'application/json')
  @Header('Accept', 'application/json')
  getLeastLinkedRepeatedRaffleNumbers(): string {
    return JSON.stringify(this.service.getLeastLinkedRepeatedRaffleNumbers());
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
      deepSeak: {
        fixed: {
          n6: this.service.testDeepSeakNumbersGenerator(
            index,
            offset,
            6,
            false,
          ),
          n7: this.service.testDeepSeakNumbersGenerator(
            index,
            offset,
            7,
            false,
          ),
          n8: this.service.testDeepSeakNumbersGenerator(
            index,
            offset,
            8,
            false,
          ),
          n9: this.service.testDeepSeakNumbersGenerator(
            index,
            offset,
            9,
            false,
          ),
        },
        renew: {
          n6: this.service.testDeepSeakNumbersGenerator(index, offset, 6, true),
          n7: this.service.testDeepSeakNumbersGenerator(index, offset, 7, true),
          n8: this.service.testDeepSeakNumbersGenerator(index, offset, 8, true),
          n9: this.service.testDeepSeakNumbersGenerator(index, offset, 9, true),
        },
      },
      mostRepeated: {
        linked: {
          linkedRenew: this.service.testMostLinkedRepeatedNumbers(
            index,
            offset,
            true,
          ),
          linked: this.service.testMostLinkedRepeatedNumbers(
            index,
            offset,
            false,
          ),
        },
        repeated: {
          numbers6: this.service.testMostRepeatedNumbers(
            index,
            offset,
            6,
            false,
          ),
          numbers7: this.service.testMostRepeatedNumbers(
            index,
            offset,
            7,
            false,
          ),
          numbers8: this.service.testMostRepeatedNumbers(
            index,
            offset,
            8,
            false,
          ),
          // numbers9: this.service.testMostRepeatedNumbers(index, offset, 9, false),
          numbers10: this.service.testMostRepeatedNumbers(
            index,
            offset,
            10,
            false,
          ),
        },
        repeatedRenew: {
          numbersRenew6: this.service.testMostRepeatedNumbers(
            index,
            offset,
            6,
            true,
          ),
          numbersRenew7: this.service.testMostRepeatedNumbers(
            index,
            offset,
            7,
            true,
          ),
          numbersRenew8: this.service.testMostRepeatedNumbers(
            index,
            offset,
            8,
            true,
          ),
          // numbersRenew9: this.service.testMostRepeatedNumbers(index, offset, 9, true),
          numbersRenew10: this.service.testMostRepeatedNumbers(
            index,
            offset,
            10,
            true,
          ),
        },
      },
      leastRepeated: {
        linked: {
          linkedRenew: this.service.testLeastLinkedRepeatedNumbers(
            index,
            offset,
            true,
          ),
          linked: this.service.testLeastLinkedRepeatedNumbers(
            index,
            offset,
            false,
          ),
        },
        repeated: {
          numbers6: this.service.testLeastRepeatedNumbers(
            index,
            offset,
            6,
            false,
          ),
          numbers7: this.service.testLeastRepeatedNumbers(
            index,
            offset,
            7,
            false,
          ),
          numbers8: this.service.testLeastRepeatedNumbers(
            index,
            offset,
            8,
            false,
          ),
          // numbers9: this.service.testLeastRepeatedNumbers(index, offset, 9, false),
          numbers10: this.service.testLeastRepeatedNumbers(
            index,
            offset,
            10,
            false,
          ),
        },
        repeatedRenew: {
          repeatedRenew6: this.service.testLeastRepeatedNumbers(
            index,
            offset,
            6,
            true,
          ),
          repeatedRenew7: this.service.testLeastRepeatedNumbers(
            index,
            offset,
            7,
            true,
          ),
          repeatedRenew8: this.service.testLeastRepeatedNumbers(
            index,
            offset,
            8,
            true,
          ),
          // repeatedRenew9: this.service.testLeastRepeatedNumbers(index, offset, 9, true),
          repeatedRenew10: this.service.testLeastRepeatedNumbers(
            index,
            offset,
            10,
            true,
          ),
        },
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

  @Get('generate-numbers')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Content-Type', 'application/json')
  @Header('Accept', 'application/json')
  getGenerateNumbers(@Query('qnt') qnt?: number | undefined) {
    return JSON.stringify(this.service.generateNumbers(qnt ?? 5));
  }
}
