import { HttpStatus } from '@nestjs/common';
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

  describe('POST: /Mutant with empty dna',() => {
    it('should return false', () => {
      const emptyDna = [];
      try {
        appController.isMutant({ dna: emptyDna })
      } catch(error) {
        expect(error.message).toBe('Forbidden');
      }
    });
  });

  describe('POST: /Mutant with human dna', () => {
    it('should return false', () => {
      const humanDna = ['ATCGATCG', 'AAAACGAT', 'AGGTGTGG', 'CCTTGGAA'];
      try {
        appController.isMutant({ dna: humanDna })
      } catch(error) {
        expect(error.message).toBe('Forbidden');
      }
    });
  });

  describe('POST: /Mutant with mutant genomas in rows', () => {
    it('should return Http 200-OK', () => {
      const mutantDna = ['ATCGATCG', 'AAAACGAT', 'AGGTGGGG'];
      expect(appController.isMutant({ dna: mutantDna }).statusCode).toBe(HttpStatus.OK);
    });
  });

  describe('POST: /Mutant with mutant genomas in rows with two consecutive 4 genomas', () => {
    it('should return Http 200-OK', () => {
      const mutantDna = ['ATCGATCG', 'AAAAAAAA', 'AGGTGTCG'];
      expect(appController.isMutant({ dna: mutantDna }).statusCode).toBe(HttpStatus.OK);
    });
  });

  describe('POST: /Mutant with mutant genomas in different cols', () => {
    it('should return Http 200-OK', () => {
      const mutantDna = ['ATC', 'ATC', 'ATC', 'ATG'];
      expect(appController.isMutant({ dna: mutantDna }).statusCode).toBe(HttpStatus.OK);
    });
  });

  describe('POST: /Mutant with mutant genomas in cols with two consecutive 4 genomas', () => {
    it('should return Http 200-OK', () => {
      const mutantDna = ['ATC', 'AGC', 'ATC', 'ATG', 'AAA', 'AGG', 'ACC', 'ATT'];
      expect(appController.isMutant({ dna: mutantDna }).statusCode).toBe(HttpStatus.OK);
    });
  });

  describe('POST: /Mutant with mutant genomas in diags from left to right in diff rows(A and C)', () => {
    it('should return Http 200-OK', () => {
      const mutantDna = [
        "ACGTG",
        "GACGT",
        "TGACG",
        "GTGAC"
      ];
      expect(appController.isMutant({ dna: mutantDna }).statusCode).toBe(HttpStatus.OK);
    });
  });

  describe('POST: /Mutant with mutant genomas in diags from left to right in diff rows(A and C)', () => {
    it('should return Http 200-OK', () => {
      const mutantDna = [
        "ACGTG",
        "GACGT",
        "TGACG",
        "GTGAG",
        "CCCGC"
      ];
      expect(appController.isMutant({ dna: mutantDna }).statusCode).toBe(HttpStatus.OK);
    });
  });

  describe('POST: /Mutant with mutant consecutive genomas in diag from left to right', () => {
    it('should return Http 200-OK', () => {
      const mutantDna = [
        "ACCCGTTT",
        "GAGGTTTG",
        "TGACCACC",
        "TTTAGTTT",
        "CCCGACCC",
        "TTTAAACC",
        "CCCTAAAC",
        "CCCGCCAA"
      ];
      expect(appController.isMutant({ dna: mutantDna }).statusCode).toBe(HttpStatus.OK);
    });
  });

  describe('POST: /Mutant with mutant consecutive genomas one in each diag direction', () => {
    it('should return Http 200-OK', () => {
      const mutantDna = [
        "ACCCGTTT",
        "GAGGTTTG",
        "TGATCACC",
        "TTTAGTTT",
        "CCCGACCC",
        "TTTAAACC",
        "CCCTAAAC",
        "CCCGCCAT"
      ];
      expect(appController.isMutant({ dna: mutantDna }).statusCode).toBe(HttpStatus.OK);
    });
  });

  describe('POST: /Mutant with mutant consecutive genomas in diag from rigt to left', () => {
    it('should return Http 200-OK', () => {
      const mutantDna = [
        "ACCCGTTT",
        "GAGGTTTG",
        "TGTACTCC",
        "TTTGTATT",
        "CCCTACCC",
        "TTTAAACC",
        "CTCTAAAC",
        "TCCGCCAT"
      ];
      expect(appController.isMutant({ dna: mutantDna }).statusCode).toBe(HttpStatus.OK);
    });
  });
});
