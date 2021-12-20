import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello Dago');
    });
  });

  describe('POST: /Mutant with human dna', () => {
    it('should return false', () => {
      const humanDna = ['ATCGATCG', 'AAAACGAT', 'AGGTGTGG', 'CCTTGGAA'];
      expect(appController.isMutant({ dna: humanDna })).toBe(false);
    });
  });

  // describe('POST: /Mutant with mutant genomas in rows', () => {
  //   it('should return true', () => {
  //     const mutantDna = ['ATCGATCG', 'AAAACGAT', 'AGGTGGGG'];
  //     expect(appController.isMutant({ dna: mutantDna })).toBe(true);
  //   });
  // });

  // describe('POST: /Mutant with mutant genomas in rows with two consecutive 4 genomas', () => {
  //   it('should return true', () => {
  //     const mutantDna = ['ATCGATCG', 'AAAAAAAA', 'AGGTGTCG'];
  //     expect(appController.isMutant({ dna: mutantDna })).toBe(true);
  //   });
  // });
});
