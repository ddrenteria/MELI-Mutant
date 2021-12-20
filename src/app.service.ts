import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  isMutant(dna: string[]): boolean {
    let isMutant = false;
    const dnaRows = dna.length;
    const dnaCols = dna[0].length;
    let consecutive_gen_sequences = 0;

    // Check horizontal
    for (let i = 0; i < dnaRows && consecutive_gen_sequences <= 1; i++) {
      let count = 0;
      let last_gen = '';
      for (let j = 0; j < dnaCols && consecutive_gen_sequences <= 1; j++) {
        if (dna[i][j] === last_gen || last_gen === '') {
          count++;
          // If we have a sequence of 4 elements increse consecutive gen sequences and reset count and last gen
          if (count === 4) {
            consecutive_gen_sequences++;
            count = 0;
            last_gen = '';
          }
        } else {
          count = 1;
        }
        last_gen = dna[i][j];
      }
    }

    if (consecutive_gen_sequences > 1) {
      isMutant = true;
    }
    return isMutant;
  }

  getHello() {
    return 'Hello Dago';
  }
}
