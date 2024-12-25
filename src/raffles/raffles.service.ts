import { Injectable, OnModuleInit } from '@nestjs/common';
import { Awards, Raffle } from 'src/types';
import FileReader from 'src/utils/file-reader';

@Injectable()
export class RafflesService implements OnModuleInit {
  private readonly raffles: Raffle[] = [];

  async onModuleInit(): Promise<void> {
    console.log(`The RafflesService module has been initialized.`);
    await this.loadRaffles();
  }

  private async loadRaffles(): Promise<void> {
    const list = await FileReader.readCSV('src/data/raffles.csv');
    this.raffles.push(...list);
    this.raffles.sort((a, b) => a.id - b.id);
  }

  getRaffles(): Raffle[] {
    return this.raffles;
  }

  getRepeatestRaffleNumbers(
    n: number = 6,
    raffles: Raffle[] = this.getRaffles(),
  ): number[] {
    const numbers = raffles.reduce(
      (acc, raffle) => {
        const allNumbers = [
          raffle.num1,
          raffle.num2,
          raffle.num3,
          raffle.num4,
          raffle.num5,
          raffle.num6,
        ];
        allNumbers.forEach((num) => {
          if (acc[num]) {
            acc[num]++;
          } else {
            acc[num] = 1;
          }
        });
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(numbers)
      .sort((a, b) => b[1] - a[1])
      .slice(0, n)
      .map(([num]) => Number.parseInt(num));
  }

  getRepeatestLinkedRaffleNumbers(
    raffles: Raffle[] = this.getRaffles(),
  ): number[] {
    const numbers = [];

    while (numbers.length < 6) {
      const num = this.getMostRepeatedNumber(raffles, numbers);
      numbers.push(num);
    }

    return numbers;
  }

  getMostRepeatedNumber(raffles: Raffle[], n: number[] | undefined): number {
    const numbers = raffles.reduce(
      (acc, raffle) => {
        const allNumbers = [
          raffle.num1,
          raffle.num2,
          raffle.num3,
          raffle.num4,
          raffle.num5,
          raffle.num6,
        ];

        if (
          n == null ||
          n === undefined ||
          n.length === 0 ||
          n.every((num) => allNumbers.indexOf(num) != -1)
        ) {
          allNumbers
            .filter((num) => !n || n.indexOf(num) === -1)
            .forEach((num) => {
              if (acc[num]) {
                acc[num]++;
              } else {
                acc[num] = 1;
              }
            });
        }

        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(numbers)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 1)
      .map(([num]) => Number.parseInt(num))[0];
  }

  getRandomNumbers(qtd: number = 6): number[] {
    const numbers = [];

    while (numbers.length < qtd) {
      const num = Math.floor(Math.random() * 59) + 1;
      if (numbers.indexOf(num) === -1) {
        numbers.push(num);
      }
    }

    return numbers;
  }

  testRepeatestNumbers(
    index: number = 500,
    offset: number = 0,
    qtd: number = 6,
    renew: boolean = false,
  ): Awards {
    const qntRaffles = this.getRaffles().length;

    if (qntRaffles === 0) {
      return {
        fourth: [],
        fifth: [],
        sixth: [],
        total: 0,
      };
    }

    if (index >= qntRaffles) {
      index = qntRaffles - 1;
    }
    if (offset + index >= qntRaffles) {
      offset = qntRaffles - index;
    }

    const initialRafles = this.getRaffles().slice(offset, index);
    const testRaflles = this.getRaffles();

    const awards: Awards = {
      fourth: [],
      fifth: [],
      sixth: [],
      total: 0,
    };

    let raffle: number[] = this.getRepeatestRaffleNumbers(qtd, initialRafles);

    testRaflles.forEach((testRaffle) => {
      const hits = raffle.filter((num) => {
        return (
          testRaffle.num1 === num ||
          testRaffle.num2 === num ||
          testRaffle.num3 === num ||
          testRaffle.num4 === num ||
          testRaffle.num5 === num ||
          testRaffle.num6 === num
        );
      });

      const misses = raffle.filter((num) => {
        return (
          testRaffle.num1 !== num &&
          testRaffle.num2 !== num &&
          testRaffle.num3 !== num &&
          testRaffle.num4 !== num &&
          testRaffle.num5 !== num &&
          testRaffle.num6 !== num
        );
      });

      awards.total++;

      switch (hits.length) {
        case 4:
          awards.fourth.push({
            raffle: raffle,
            hits: hits,
            misses: misses,
          });
          break;
        case 5:
          awards.fifth.push({
            raffle: raffle,
            hits: hits,
            misses: misses,
          });
          break;
        case 6:
          awards.sixth.push({
            raffle: raffle,
            hits: hits,
            misses: misses,
          });
          break;
      }

      if (renew) {
        initialRafles.push(testRaffle);
        raffle = this.getRepeatestRaffleNumbers(qtd, initialRafles);
      }
    });

    return awards;
  }

  testLinkedNumbers(
    index: number = 500,
    offset: number = 0,
    renew: boolean = false,
  ): Awards {
    const qntRaffles = this.getRaffles().length;

    if (qntRaffles === 0) {
      return {
        fourth: [],
        fifth: [],
        sixth: [],
        total: 0,
      };
    }

    if (index >= qntRaffles) {
      index = qntRaffles - 1;
    }
    if (offset > index) {
      offset = index;
    }
    if (offset + index >= qntRaffles) {
      offset = 0;
      index = Math.floor(qntRaffles / index);
    }

    const initialRafles = this.getRaffles().slice(offset, index);
    const testRaflles = this.getRaffles();

    const awards: Awards = {
      fourth: [],
      fifth: [],
      sixth: [],
      total: 0,
    };

    let raffle: number[] = this.getRepeatestLinkedRaffleNumbers(initialRafles);

    testRaflles.forEach((testRaffle) => {
      const hits = raffle.filter((num) => {
        return (
          testRaffle.num1 === num ||
          testRaffle.num2 === num ||
          testRaffle.num3 === num ||
          testRaffle.num4 === num ||
          testRaffle.num5 === num ||
          testRaffle.num6 === num
        );
      });

      const misses = raffle.filter((num) => {
        return (
          testRaffle.num1 !== num &&
          testRaffle.num2 !== num &&
          testRaffle.num3 !== num &&
          testRaffle.num4 !== num &&
          testRaffle.num5 !== num &&
          testRaffle.num6 !== num
        );
      });

      awards.total++;

      switch (hits.length) {
        case 4:
          awards.fourth.push({
            raffle: raffle,
            hits: hits,
            misses: misses,
          });
          break;
        case 5:
          awards.fifth.push({
            raffle: raffle,
            hits: hits,
            misses: misses,
          });
          break;
        case 6:
          awards.sixth.push({
            raffle: raffle,
            hits: hits,
            misses: misses,
          });
          break;
      }

      if (renew) {
        initialRafles.push(testRaffle);
        raffle = this.getRepeatestLinkedRaffleNumbers(initialRafles);
      }
    });

    return awards;
  }

  testRandomNumbers(qtd: number = 6, renew: boolean = false): Awards {
    const testRaflles = this.getRaffles();

    const awards: Awards = {
      fourth: [],
      fifth: [],
      sixth: [],
      total: 0,
    };

    let raffle: number[] = this.getRandomNumbers(qtd);

    testRaflles.forEach((testRaffle) => {
      const hits = raffle.filter((num) => {
        return (
          testRaffle.num1 === num ||
          testRaffle.num2 === num ||
          testRaffle.num3 === num ||
          testRaffle.num4 === num ||
          testRaffle.num5 === num ||
          testRaffle.num6 === num
        );
      });

      const misses = raffle.filter((num) => {
        return (
          testRaffle.num1 !== num &&
          testRaffle.num2 !== num &&
          testRaffle.num3 !== num &&
          testRaffle.num4 !== num &&
          testRaffle.num5 !== num &&
          testRaffle.num6 !== num
        );
      });

      awards.total++;

      switch (hits.length) {
        case 4:
          awards.fourth.push({
            raffle: raffle,
            hits: hits,
            misses: misses,
          });
          break;
        case 5:
          awards.fifth.push({
            raffle: raffle,
            hits: hits,
            misses: misses,
          });
          break;
        case 6:
          awards.sixth.push({
            raffle: raffle,
            hits: hits,
            misses: misses,
          });
          break;
      }

      if (renew) {
        raffle = this.getRandomNumbers(qtd);
      }
    });

    return awards;
  }
}
