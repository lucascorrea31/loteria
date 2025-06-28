import { Injectable, OnModuleInit } from '@nestjs/common';
import { Awards, Raffle } from 'src/types';
import FileReader from 'src/utils/file-reader';

@Injectable()
export class RafflesQuinceService implements OnModuleInit {
  private readonly raffles: Raffle[] = [];

  async onModuleInit(): Promise<void> {
    console.log(`The RafflesQuinceService module has been initialized.`);
    await this.loadRaffles();
  }

  private async loadRaffles(): Promise<void> {
    const list = await FileReader.readCSV('src/data/raffles_quince.csv');
    this.raffles.push(...list);
    this.raffles.sort((a, b) => a.id - b.id);
  }

  getRaffles(): Raffle[] {
    return this.raffles;
  }

  getHello(): string {
    return `
    <html5>
    <body>
    <h1>Raffles for Quince!</h1>
    <ul>
    <li><a href="/raffles-quince/most-repeated-numbers/5">most-repeated-numbers/n?</a></li>
    <li><a href="/raffles-quince/most-linked-repeated-numbers">most-linked-repeated-numbers</a></li>
    <li><a href="/raffles-quince/least-repeated-numbers/5">least-repeated-numbers/n?</a></li>
    <li><a href="/raffles-quince/least-linked-repeated-numbers">least-linked-repeated-numbers</a></li>
    <li><a href="/raffles-quince/compare-numbers">compare-numbers</a></li>
    <li><a href="/raffles-quince/generate-numbers">generate-numbers</a></li>
    <li><a href="/">Voltar</a></li>
    </ul>
    </body>
    </html5>
    `;
  }

  getMostRepeatedRaffleNumbers(
    n: number = 5,
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

  getMostLinkedRepeatedRaffleNumbers(
    raffles: Raffle[] = this.getRaffles(),
  ): number[] {
    const numbers = [];

    while (numbers.length < 5) {
      const num = this.getMostRepeatedNumber(raffles, numbers);
      numbers.push(num);
    }

    return numbers;
  }

  getLeastRepeatedRaffleNumbers(
    n: number = 5,
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
      .sort((a, b) => a[1] - b[1])
      .slice(0, n)
      .map(([num]) => Number.parseInt(num));
  }

  getLeastLinkedRepeatedRaffleNumbers(
    raffles: Raffle[] = this.getRaffles(),
  ): number[] {
    const numbers = [];

    while (numbers.length < 5) {
      const num = this.getLeastRepeatedNumber(raffles, numbers);
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

  getLeastRepeatedNumber(raffles: Raffle[], n: number[] | undefined): number {
    const numbers = raffles.reduce(
      (acc, raffle) => {
        const allNumbers = [
          raffle.num1,
          raffle.num2,
          raffle.num3,
          raffle.num4,
          raffle.num5,
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
      .sort((a, b) => a[1] - b[1])
      .slice(0, 1)
      .map(([num]) => Number.parseInt(num))[0];
  }

  getRandomNumbers(qtd: number = 5): number[] {
    const numbers = [];

    while (numbers.length < qtd) {
      const num = Math.floor(Math.random() * 79) + 1;
      if (numbers.indexOf(num) === -1) {
        numbers.push(num);
      }
    }

    return numbers;
  }

  calculateFrequencies(
    raffles: Raffle[] = this.getRaffles(),
  ): Map<number, number> {
    const frequencyMap = new Map<number, number>();
    raffles.forEach((raffle) => {
      frequencyMap.set(raffle.num1, (frequencyMap.get(raffle.num1) || 0) + 1);
      frequencyMap.set(raffle.num2, (frequencyMap.get(raffle.num2) || 0) + 1);
      frequencyMap.set(raffle.num3, (frequencyMap.get(raffle.num3) || 0) + 1);
      frequencyMap.set(raffle.num4, (frequencyMap.get(raffle.num4) || 0) + 1);
      frequencyMap.set(raffle.num5, (frequencyMap.get(raffle.num5) || 0) + 1);
    });
    return frequencyMap;
  }

  getDezenaPriority(dezena: number): number {
    if (dezena >= 4 && dezena <= 5) return 2;
    return 1;
  }

  generateNumbers(
    qnt: number,
    raffles: Raffle[] = this.getRaffles(),
  ): number[] {
    const clusters = this.calculateClusters();
    const frequencies = this.calculateFrequencies(raffles);
    const candidates = Array.from({ length: 80 }, (_, i) => i + 1);

    const recentNumbers = this.getRecentNumbers();
    const weights = candidates.map((num) => {
      const recencyBoost = recentNumbers.includes(num) ? 1.2 : 1;

      const dezena = Math.ceil(num / 10);
      const clusterScore = Array.from(clusters).reduce((acc, [key, count]) => {
        const [a, b] = key.split('-').map(Number);
        return acc + (num === a || num === b ? count * 0.3 : 0);
      }, 0);

      return (
        ((frequencies.get(num) || 0) * this.getDezenaPriority(dezena) +
          clusterScore) *
        recencyBoost
      );
    });

    const selected = new Set<number>();
    while (selected.size < qnt) {
      const coldNumbers = this.getColdNumbers();
      const pool = candidates.filter((n) => !selected.has(n));
      const index = this.pickWeightedIndex(pool.map((n) => weights[n - 1]));
      const chosen = pool[index];

      if (Math.random() < 0.15 && coldNumbers.length > 0) {
        const coldIndex = Math.floor(Math.random() * coldNumbers.length);
        selected.add(coldNumbers[coldIndex]);
        continue;
      }

      if (
        this.isValidAddition(chosen, selected) &&
        this.isValidSum(selected, chosen)
      ) {
        selected.add(chosen);
      }
    }

    return Array.from(selected).sort((a, b) => a - b);
  }

  private isValidSum(selected: Set<number>, newNum: number): boolean {
    const currentSum = Array.from(selected).reduce((a, b) => a + b, 0) + newNum;
    // A soma típica de um sorteio varia entre 150-250
    return currentSum >= 150 && currentSum <= 250;
  }

  private getColdNumbers(): number[] {
    const avgFrequency =
      Array.from(this.calculateFrequencies().values()).reduce(
        (a, b) => a + b,
        0,
      ) / 80;

    return Array.from({ length: 60 }, (_, i) => i + 1).filter(
      (num) => (this.calculateFrequencies().get(num) || 0) < avgFrequency * 0.7,
    );
  }

  private getRecentNumbers(windowSize: number = 50): number[] {
    const recent = this.raffles.slice(-windowSize);
    return recent.flatMap((r) => [r.num1, r.num2, r.num3, r.num4, r.num5]);
  }

  private calculateClusters(): Map<string, number> {
    const clusterMap = new Map<string, number>();
    this.raffles.forEach((raffle) => {
      const raffleNumbers = [
        raffle.num1,
        raffle.num2,
        raffle.num3,
        raffle.num4,
        raffle.num5,
      ];
      const sorted = raffleNumbers.sort((a, b) => a - b);
      for (let i = 0; i < sorted.length - 1; i++) {
        const key = `${sorted[i]}-${sorted[i + 1]}`;
        clusterMap.set(key, (clusterMap.get(key) || 0) + 1);
      }
    });
    return clusterMap;
  }

  private pickWeightedIndex(weights: number[]): number {
    const total = weights.reduce((acc, w) => acc + w, 0);
    const rand = Math.random() * total;
    let sum = 0;
    return weights.findIndex((w) => (sum += w) >= rand);
  }

  private isValidAddition(num: number, selected: Set<number>): boolean {
    const currentPairs = Array.from(selected).filter((n) => n % 2 === 0).length;
    const newPair = num % 2 === 0;
    if (selected.size < 5) {
      if (newPair && currentPairs >= 3) return false;
      if (!newPair && selected.size - currentPairs >= 3) return false;
    }

    const dezena = Math.ceil(num / 10);
    return (
      Array.from(selected).filter((n) => Math.ceil(n / 10) === dezena).length <
      2
    );
  }

  testMostRepeatedNumbers(
    index: number = 500,
    offset: number = 0,
    qtd: number = 5,
    renew: boolean = false,
  ): Awards {
    const qntRaffles = this.getRaffles().length;

    if (qntRaffles === 0) {
      return {
        third: [],
        fourth: [],
        fifth: [],
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
      third: [],
      fourth: [],
      fifth: [],
      total: 0,
    };

    let raffle: number[] = this.getMostRepeatedRaffleNumbers(
      qtd,
      initialRafles,
    );

    testRaflles.forEach((testRaffle) => {
      const hits = raffle.filter((num) => {
        return (
          testRaffle.num1 === num ||
          testRaffle.num2 === num ||
          testRaffle.num3 === num ||
          testRaffle.num4 === num ||
          testRaffle.num5 === num
        );
      });

      const misses = raffle.filter((num) => {
        return (
          testRaffle.num1 !== num &&
          testRaffle.num2 !== num &&
          testRaffle.num3 !== num &&
          testRaffle.num4 !== num &&
          testRaffle.num5 !== num
        );
      });

      awards.total++;

      switch (hits.length) {
        case 4:
          awards.fourth.push({
            raffle: raffle,
            hits: hits,
            misses: misses,
            id: testRaffle.id,
            date: testRaffle.date,
          });
          break;
        case 5:
          awards.fifth.push({
            raffle: raffle,
            hits: hits,
            misses: misses,
            id: testRaffle.id,
            date: testRaffle.date,
          });
          break;
        case 3:
          awards.third.push({
            raffle: raffle,
            hits: hits,
            misses: misses,
            id: testRaffle.id,
            date: testRaffle.date,
          });
          break;
      }

      if (renew) {
        initialRafles.push(testRaffle);
        raffle = this.getMostRepeatedRaffleNumbers(qtd, initialRafles);
      }
    });

    return awards;
  }

  testMostLinkedRepeatedNumbers(
    index: number = 500,
    offset: number = 0,
    renew: boolean = false,
  ): Awards {
    const qntRaffles = this.getRaffles().length;

    if (qntRaffles === 0) {
      return {
        third: [],
        fourth: [],
        fifth: [],
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
      third: [],
      fourth: [],
      fifth: [],
      total: 0,
    };

    let raffle: number[] =
      this.getMostLinkedRepeatedRaffleNumbers(initialRafles);

    testRaflles.forEach((testRaffle) => {
      const hits = raffle.filter((num) => {
        return (
          testRaffle.num1 === num ||
          testRaffle.num2 === num ||
          testRaffle.num3 === num ||
          testRaffle.num4 === num ||
          testRaffle.num5 === num
        );
      });

      const misses = raffle.filter((num) => {
        return (
          testRaffle.num1 !== num &&
          testRaffle.num2 !== num &&
          testRaffle.num3 !== num &&
          testRaffle.num4 !== num &&
          testRaffle.num5 !== num
        );
      });

      awards.total++;

      switch (hits.length) {
        case 4:
          awards.fourth.push({
            raffle: raffle,
            hits: hits,
            misses: misses,
            id: testRaffle.id,
            date: testRaffle.date,
          });
          break;
        case 5:
          awards.fifth.push({
            raffle: raffle,
            hits: hits,
            misses: misses,
            id: testRaffle.id,
            date: testRaffle.date,
          });
          break;
        case 3:
          awards.third.push({
            raffle: raffle,
            hits: hits,
            misses: misses,
            id: testRaffle.id,
            date: testRaffle.date,
          });
          break;
      }

      if (renew) {
        initialRafles.push(testRaffle);
        raffle = this.getMostLinkedRepeatedRaffleNumbers(initialRafles);
      }
    });

    return awards;
  }

  testLeastRepeatedNumbers(
    index: number = 500,
    offset: number = 0,
    qtd: number = 5,
    renew: boolean = false,
  ): Awards {
    const qntRaffles = this.getRaffles().length;

    if (qntRaffles === 0) {
      return {
        third: [],
        fourth: [],
        fifth: [],
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
      third: [],
      fourth: [],
      fifth: [],
      total: 0,
    };

    let raffle: number[] = this.getLeastRepeatedRaffleNumbers(
      qtd,
      initialRafles,
    );

    testRaflles.forEach((testRaffle) => {
      const hits = raffle.filter((num) => {
        return (
          testRaffle.num1 === num ||
          testRaffle.num2 === num ||
          testRaffle.num3 === num ||
          testRaffle.num4 === num ||
          testRaffle.num5 === num
        );
      });

      const misses = raffle.filter((num) => {
        return (
          testRaffle.num1 !== num &&
          testRaffle.num2 !== num &&
          testRaffle.num3 !== num &&
          testRaffle.num4 !== num &&
          testRaffle.num5 !== num
        );
      });

      awards.total++;

      switch (hits.length) {
        case 4:
          awards.fourth.push({
            raffle: raffle,
            hits: hits,
            misses: misses,
            id: testRaffle.id,
            date: testRaffle.date,
          });
          break;
        case 5:
          awards.fifth.push({
            raffle: raffle,
            hits: hits,
            misses: misses,
            id: testRaffle.id,
            date: testRaffle.date,
          });
          break;
        case 3:
          awards.third.push({
            raffle: raffle,
            hits: hits,
            misses: misses,
            id: testRaffle.id,
            date: testRaffle.date,
          });
          break;
      }

      if (renew) {
        initialRafles.push(testRaffle);
        raffle = this.getLeastRepeatedRaffleNumbers(qtd, initialRafles);
      }
    });

    return awards;
  }

  testLeastLinkedRepeatedNumbers(
    index: number = 500,
    offset: number = 0,
    renew: boolean = false,
  ): Awards {
    const qntRaffles = this.getRaffles().length;

    if (qntRaffles === 0) {
      return {
        third: [],
        fourth: [],
        fifth: [],
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
      third: [],
      fourth: [],
      fifth: [],
      total: 0,
    };

    let raffle: number[] =
      this.getLeastLinkedRepeatedRaffleNumbers(initialRafles);

    testRaflles.forEach((testRaffle) => {
      const hits = raffle.filter((num) => {
        return (
          testRaffle.num1 === num ||
          testRaffle.num2 === num ||
          testRaffle.num3 === num ||
          testRaffle.num4 === num ||
          testRaffle.num5 === num
        );
      });

      const misses = raffle.filter((num) => {
        return (
          testRaffle.num1 !== num &&
          testRaffle.num2 !== num &&
          testRaffle.num3 !== num &&
          testRaffle.num4 !== num &&
          testRaffle.num5 !== num
        );
      });

      awards.total++;

      switch (hits.length) {
        case 4:
          awards.fourth.push({
            raffle: raffle,
            hits: hits,
            misses: misses,
            id: testRaffle.id,
            date: testRaffle.date,
          });
          break;
        case 5:
          awards.fifth.push({
            raffle: raffle,
            hits: hits,
            misses: misses,
            id: testRaffle.id,
            date: testRaffle.date,
          });
          break;
        case 3:
          awards.third.push({
            raffle: raffle,
            hits: hits,
            misses: misses,
            id: testRaffle.id,
            date: testRaffle.date,
          });
          break;
      }

      if (renew) {
        initialRafles.push(testRaffle);
        raffle = this.getLeastLinkedRepeatedRaffleNumbers(initialRafles);
      }
    });

    return awards;
  }

  testRandomNumbers(qtd: number = 5, renew: boolean = false): Awards {
    const testRaflles = this.getRaffles();

    const awards: Awards = {
      third: [],
      fourth: [],
      fifth: [],
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
          testRaffle.num5 === num
        );
      });

      const misses = raffle.filter((num) => {
        return (
          testRaffle.num1 !== num &&
          testRaffle.num2 !== num &&
          testRaffle.num3 !== num &&
          testRaffle.num4 !== num &&
          testRaffle.num5 !== num
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
        case 3:
          awards.third.push({
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

  testDeepSeakNumbersGenerator(
    index: number = 500,
    offset: number = 0,
    qtd: number = 5,
    renew: boolean = false,
  ): Awards {
    const qntRaffles = this.getRaffles().length;

    if (qntRaffles === 0) {
      return {
        third: [],
        fourth: [],
        fifth: [],
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
      third: [],
      fourth: [],
      fifth: [],
      total: 0,
    };

    let raffle: number[] = this.generateNumbers(qtd, initialRafles);

    testRaflles.forEach((testRaffle) => {
      const hits = raffle.filter((num) => {
        return (
          testRaffle.num1 === num ||
          testRaffle.num2 === num ||
          testRaffle.num3 === num ||
          testRaffle.num4 === num ||
          testRaffle.num5 === num
        );
      });

      const misses = raffle.filter((num) => {
        return (
          testRaffle.num1 !== num &&
          testRaffle.num2 !== num &&
          testRaffle.num3 !== num &&
          testRaffle.num4 !== num &&
          testRaffle.num5 !== num
        );
      });

      awards.total++;

      switch (hits.length) {
        case 4:
          awards.fourth.push({
            raffle: raffle,
            hits: hits,
            misses: misses,
            id: testRaffle.id,
            date: testRaffle.date,
          });
          break;
        case 5:
          awards.fifth.push({
            raffle: raffle,
            hits: hits,
            misses: misses,
            id: testRaffle.id,
            date: testRaffle.date,
          });
          break;
        case 3:
          awards.third.push({
            raffle: raffle,
            hits: hits,
            misses: misses,
            id: testRaffle.id,
            date: testRaffle.date,
          });
          break;
      }

      if (renew) {
        initialRafles.push(testRaffle);
        raffle = this.generateNumbers(qtd, initialRafles);
      }
    });

    return awards;
  }
}
