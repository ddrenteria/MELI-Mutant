import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  aaaa(
    dna: string[],
    consecutive_gen_sequences: number,
    last_gen: string,
    count: number,
    row: number,
    column: number
    ) {
    if (dna[row][column] === last_gen || last_gen === '') {
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
    last_gen = dna[row][column];
    return { consecutive_gen_sequences, last_gen, count };
  }

  getHorizontalConsecutiveSequencesUntilTwo(dna: string[], consecutive_gen_sequences: number) {
    const dnaRows = dna.length;
    const dnaCols = dna[0]?.length || 0;
    for (let i = 0; i < dnaRows && consecutive_gen_sequences <= 1; i++) {
      let count = 0;
      let last_gen = '';
      for (let j = 0; j < dnaCols && consecutive_gen_sequences <= 1; j++) {
        ({ consecutive_gen_sequences, last_gen, count } = this.aaaa(
          dna,
          consecutive_gen_sequences,
          last_gen,
          count,
          i,
          j
        ));
      }
    }
    return consecutive_gen_sequences;
  }

  getVerticalConsecutiveSequencesUntilTwo(dna: string[], consecutive_gen_sequences) {
    const dnaRows = dna.length;
    const dnaCols = dna[0]?.length || 0;
    for (let j = 0; j < dnaCols && consecutive_gen_sequences <= 1; j++) {
      let count = 0;
      let last_gen = '';
      for (let i = 0; i < dnaRows && consecutive_gen_sequences <= 1; i++) {
        ({ consecutive_gen_sequences, last_gen, count } = this.aaaa(
          dna,
          consecutive_gen_sequences,
          last_gen,
          count,
          i,
          j
        ));
      }
    }
    return consecutive_gen_sequences;
  }

  isMutant(dna: string[]): boolean {
    let isMutant = false;
    let consecutive_gen_sequences = 0;

    // Check horizontal
    consecutive_gen_sequences = this.getHorizontalConsecutiveSequencesUntilTwo(dna, consecutive_gen_sequences);
    consecutive_gen_sequences = this.getVerticalConsecutiveSequencesUntilTwo(dna, consecutive_gen_sequences);

    if (consecutive_gen_sequences > 1) {
      isMutant = true;
    }
    return isMutant;
  }

  getHello() {
    return 'Hello Dago';
  }
}
