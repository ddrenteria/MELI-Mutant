import { Test, TestingModule } from '@nestjs/testing';
import { DnaService } from '../dna.service';

describe('DnaService', () => {
  let service: DnaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DnaService],
    }).compile();

    service = module.get<DnaService>(DnaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('POST: /Mutant with empty dna',() => {
    it('should return false', () => {
      const emptyDna = [];
      expect(service.isMutant(emptyDna)).toBe(false);
    });
  });

  describe('POST: /Mutant with human dna', () => {
    it('should return false', () => {
      const humanDna = ['ATCGATCG', 'AAAACGAT', 'AGGTGTGG', 'CCTTGGAA'];
      expect(service.isMutant(humanDna)).toBe(false);
    });
  });

  describe('POST: /Mutant with mutant genomas in rows', () => {
    it('should return Http 200-OK', async () => {
      const mutantDna = ['ATCGATCG', 'AAAACGAT', 'AGGTGGGG'];
      expect(service.isMutant(mutantDna)).toBe(true);
    });
  });

  describe('POST: /Mutant with mutant genomas in rows with two consecutive 4 genomas', () => {
    it('should return Http 200-OK', async () => {
      const mutantDna = ['ATCGATCG', 'AAAAAAAA', 'AGGTGTCG'];
      expect(service.isMutant(mutantDna)).toBe(true);
    });
  });

  describe('POST: /Mutant with mutant genomas in different cols', () => {
    it('should return Http 200-OK', async () => {
      const mutantDna = ['ATC', 'ATC', 'ATC', 'ATG'];
      expect(service.isMutant(mutantDna)).toBe(true);
    });
  });

  describe('POST: /Mutant with mutant genomas in cols with two consecutive 4 genomas', () => {
    it('should return Http 200-OK', async () => {
      const mutantDna = ['ATC', 'AGC', 'ATC', 'ATG', 'AAA', 'AGG', 'ACC', 'ATT'];
      expect(service.isMutant(mutantDna)).toBe(true);
    });
  });

  describe('POST: /Mutant with mutant genomas in diags from left to right in diff rows(A and C)', () => {
    it('should return Http 200-OK', async () => {
      const mutantDna = [
        "ACGTG",
        "GACGT",
        "TGACG",
        "GTGAC"
      ];
      expect(service.isMutant(mutantDna)).toBe(true);
    });
  });

  describe('POST: /Mutant with mutant genomas in diags from left to right in diff rows(A and C)', () => {
    it('should return Http 200-OK', async () => {
      const mutantDna = [
        "ACGTG",
        "GACGT",
        "TGACG",
        "GTGAG",
        "CCCGC"
      ];
      expect(service.isMutant(mutantDna)).toBe(true);
    });
  });

  describe('POST: /Mutant with mutant consecutive genomas in diag from left to right', () => {
    it('should return Http 200-OK', async () => {
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
      expect(service.isMutant(mutantDna)).toBe(true);
    });
  });

  describe('POST: /Mutant with mutant consecutive genomas one in each diag direction', () => {
    it('should return Http 200-OK', async () => {
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
      expect(service.isMutant(mutantDna)).toBe(true);
    });
  });

  describe('POST: /Mutant with mutant consecutive genomas in diag from rigt to left', () => {
    it('should return Http 200-OK', async () => {
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
      expect(service.isMutant(mutantDna)).toBe(true);
    });
  });
});
