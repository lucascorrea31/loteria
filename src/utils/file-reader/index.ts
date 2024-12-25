import * as fs from 'fs';
import { Raffle } from 'src/types';

class FileReader {
  static readCSV(filePath: string): Promise<Raffle[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        const lines = data.trim().split('\n');
        const result = [];

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(';');
          const obj: Raffle = {
            id: parseInt(values[0]),
            date: values[1],
            num1: parseInt(values[2]),
            num2: parseInt(values[3]),
            num3: parseInt(values[4]),
            num4: parseInt(values[5]),
            num5: parseInt(values[6]),
            num6: parseInt(values[7]),
          };

          result.push(obj);
        }

        resolve(result);
      });
    });
  }
}

export default FileReader;
