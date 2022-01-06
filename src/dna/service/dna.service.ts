import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GlobalService } from '../../helpers/globalCache';
import { Dna } from '../dna.entity';
import { StatsInterface } from './stats.interface';

@Injectable()
export class DnaService {
  constructor(@InjectRepository(Dna) private dnaRepository: Repository<Dna>) {}

  async findDna(dnaAsString: string): Promise<Dna | null> {
    const foundDna = await this.dnaRepository.findOne({ where: { dna: dnaAsString } });
    return foundDna || null;
  }

  async registerDna(dna: string[]): Promise<Dna> {
    const dnaAsString = dna.join('|');
    let foundDna = await this.findDna(dnaAsString);

    // if foundDna is already registered, return it
    if (foundDna) {
      return foundDna;
    }

    // if not, register it
    const dnaToRegister: Dna = new Dna();
    dnaToRegister.dna = dnaAsString;
    dnaToRegister.isMutant = this.isMutant(dna);

    const savedDna = await this.dnaRepository.save(dnaToRegister);
    // Update cached counter of amount of mutant and humans
    if (dnaToRegister.isMutant && GlobalService.amountOfMutants !== undefined) {
      console.log('Increasing amount of mutants');
      GlobalService.amountOfMutants++;
    }
    if (!dnaToRegister.isMutant && GlobalService.amountOfHumans !== undefined) {
      console.log('Increasing amount of humans');
      GlobalService.amountOfHumans++;
    }

    return savedDna;
  }

  stepUpdate(
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
        ({ consecutive_gen_sequences, last_gen, count } = this.stepUpdate(
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

  getVerticalConsecutiveSequencesUntilTwo(dna: string[], consecutive_gen_sequences: number) {
    const dnaRows = dna.length;
    const dnaCols = dna[0]?.length || 0;
    for (let j = 0; j < dnaCols && consecutive_gen_sequences <= 1; j++) {
      let count = 0;
      let last_gen = '';
      for (let i = 0; i < dnaRows && consecutive_gen_sequences <= 1; i++) {
        ({ consecutive_gen_sequences, last_gen, count } = this.stepUpdate(
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

  getStartingValuesForDiagonalLeftToRight(maxRows: number, maxCols: number) {
    let startingValues = [];
    for (let row = 0; row < maxRows; row++) {
      startingValues.push([row, 0]);
    }
    // start on 1 to avoid repeating diagonal
    for (let col = 1; col < maxCols; col++) {
      startingValues.push([0, col]);
    }
    return startingValues;
  }

  getDiagonalLeftToRightConsecutiveSequencesUntilTwo(dna: string[], consecutive_gen_sequences: number) {
    const dnaRows = dna.length;
    const dnaCols = dna[0]?.length || 0;
    const startingValues = this.getStartingValuesForDiagonalLeftToRight(dnaRows, dnaCols);
    startingValues.forEach((startingValue) => {
      let count = 0;
      let last_gen = '';
      // Diagonal starting on the first row from right to left
      for(let k = 0; k < dnaCols && consecutive_gen_sequences <= 1; k++) {
        let row = startingValue[0] + k;
        let col = startingValue[1] + k;
        if (row < dnaRows && col < dnaCols) {
          ({ consecutive_gen_sequences, last_gen, count } = this.stepUpdate(
            dna,
            consecutive_gen_sequences,
            last_gen,
            count,
            row,
            col
          ));
        } else {
          break;
        }
      }
    });
    return consecutive_gen_sequences;
  }

  getDiagonalRightToLeftConsecutiveSequencesUntilTwo(dna: string[], consecutive_gen_sequences: number) {
    const dnaRows = dna.length;
    const dnaCols = dna[0]?.length || 0;
    const startingValues = this.getStartingValuesForDiagonalLeftToRight(dnaRows, dnaCols);
    startingValues.forEach((startingValue) => {
      let count = 0;
      let last_gen = '';
      // Diagonal starting on the first row from left to right
      for(let k = 0; k < dnaCols && consecutive_gen_sequences <= 1; k++) {
        let row = startingValue[0] + k;
        // column start on end column - starting value
        let col = (dnaCols - 1) - (startingValue[1] + k);
        if (row < dnaRows && col < dnaCols && col >= 0) {
          ({ consecutive_gen_sequences, last_gen, count } = this.stepUpdate(
            dna,
            consecutive_gen_sequences,
            last_gen,
            count,
            row,
            col
          ));
        } else {
          break;
        }
      }
    });
    return consecutive_gen_sequences;
  }

  isMutant(dna: string[]): boolean {
    let consecutive_gen_sequences = 0;

    // Check horizontal
    consecutive_gen_sequences = this.getHorizontalConsecutiveSequencesUntilTwo(dna, consecutive_gen_sequences);
    consecutive_gen_sequences = this.getVerticalConsecutiveSequencesUntilTwo(dna, consecutive_gen_sequences);
    consecutive_gen_sequences = this.getDiagonalLeftToRightConsecutiveSequencesUntilTwo(dna, consecutive_gen_sequences);
    consecutive_gen_sequences = this.getDiagonalRightToLeftConsecutiveSequencesUntilTwo(dna, consecutive_gen_sequences);
    if (consecutive_gen_sequences > 1) {
      return true;
    }
    return false;
  }

  async getAmountOfMutantsAndHumans(): Promise<{ amountOfMutants: number, amountOfHumans: number }> {
    let amountOfMutants = GlobalService.amountOfMutants; // get from global service
    let amountOfHumans = GlobalService.amountOfHumans; // get from global service

    // if not cached, get from db
    if (amountOfMutants === undefined || amountOfHumans === undefined) {
      const queryResponse = await this.dnaRepository.createQueryBuilder('dna')
        .groupBy('dna.isMutant')
        .select('dna.isMutant', 'isMutant')
        .addSelect('COUNT(dna.isMutant)', 'count')
        .getRawMany();
      
      amountOfMutants = parseInt(queryResponse.find(group => group.isMutant == true)?.count || "0");
      amountOfHumans = parseInt(queryResponse.find(group => group.isMutant == false)?.count || "0");
      GlobalService.amountOfMutants = amountOfMutants;
      GlobalService.amountOfHumans = amountOfHumans;
    }
    return { amountOfMutants, amountOfHumans };
  }

  async getStats(): Promise<StatsInterface> {
    const amountOfMutantsAndHumans = await this.getAmountOfMutantsAndHumans();

    return { 
      count_mutant_dna: amountOfMutantsAndHumans.amountOfMutants,
      count_human_dna: amountOfMutantsAndHumans.amountOfHumans,
      ratio: amountOfMutantsAndHumans.amountOfMutants / amountOfMutantsAndHumans.amountOfHumans
    };
  }
}
