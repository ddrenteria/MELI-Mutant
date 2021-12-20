import { Injectable } from '@nestjs/common';

@Injectable()
export class BoxesService {
  async isMutant(dna: string[][]): Promise<boolean> {
    let isMutant = false;
    const dnaRows = dna.length;
    const dnaCols = dna[0].length;
    let consecutive_gen_sequences = 0;

    // Check horizontal
    for (let i = 0; i < dnaRows && consecutive_gen_sequences <= 1; i++) {
      let count = 0;
      let last_gen = '';
      for (let j = 0; j < dnaCols && consecutive_gen_sequences <= 1; j++) {
        if (dna[i][j] === last_gen) {
          count++;
          // If we dont have the same genoma
          if (count === 4) {
            consecutive_gen_sequences++;
            count = 0;
            last_gen = '';
          }
        } else {
          last_gen = dna[i][j];
        }
      }
    }

    if (consecutive_gen_sequences > 1) {
      isMutant = true;
    }
    return isMutant;

    // // Check vertical
    // for (let i = 0; i < dnaCols; i++) {
    //   let count = 0;
    //   for (let j = 0; j < dnaRows; j++) {
    //     if (dnaArray[j][i].value === 'X') {
    //       count++;
    //     }
    //   }
    //   if (count >= 3) {
    //     isMutant = true;
    //     break;
    //   }
    // }

    // // Check diagonal from left to right
    // for (let i = 0; i < dnaRows; i++) {
    //   let count = 0;
    //   for (let j = 0; j < dnaCols; j++) {
    //     if (dnaArray[i][j].value === 'X') {
    //       count++;
    //     }
    //     if (count >= 3) {
    //       isMutant = true;
    //       break;
    //     }
    //   }
    // }

    // // Check diagonal from right to left
    // for (let i = dnaRows - 1; i >= 0; i--) {
    //   let count = 0;
    //   for (let j = 0; j < dnaCols; j++) {
    //     if (dnaArray[i][j].value === 'X') {
    //       count++;
    //     }
    //     if (count >= 3) {
    //       isMutant = true;
    //       break;
    //     }
    //   }
    // }

    // return isMutant;
    // return dnaMatrix.isMutant();
  }
  // async getAll(): Promise<Box[]> {
  //   const boxes = await Box.find();
  //   return boxes;
  // }

  // async findOneBy(key: string, value: string | number): Promise<Box | null> {
  //   const findCondition = {};
  //   findCondition[key] = value;
  //   const box = await Box.findOne({ where: findCondition });
  //   return box || null;
  // }

  // async saveBox(box: Box): Promise<Box> {
  //   const newBox = await Box.save(box);
  //   return newBox;
  // }

  // async saveBoxFromInterface(box: BoxInterface): Promise<Box> {
  //   const newBox = await this.saveBox(plainToClass(Box, box));
  //   return newBox;
  // }

  // async registerAdn(body: AdnInterface): Promise<Adn> {
  //   if (body.status && body.status !== boxStatus.PENDING) {
  //     throw new Error('Box status must be PENDING');
  //   }
  //   const newBox = await this.saveBoxFromInterface(body);
  //   return newBox;
  // }
}
