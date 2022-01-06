import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Dna } from '../../../dna/dna.entity';
import { DnaService } from '../dna.service';
import { RepositoryMock } from './repository.mock';

describe('DnaService', () => {
  let service: DnaService;
  let repositoryMock: RepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DnaService,
        {
					provide: getRepositoryToken(Dna),
					useClass: RepositoryMock,
				},
      ],
    }).compile();

    service = module.get<DnaService>(DnaService);
    repositoryMock = module.get<RepositoryMock>(getRepositoryToken(Dna));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('isMutant with empty dna',() => {
    it('should return false', () => {
      const emptyDna = [];
      expect(service.isMutant(emptyDna)).toBe(false);
    });
  });

  describe('isMutant with human dna', () => {
    it('should return false', () => {
      const humanDna = ['ATCGATCG', 'AAAACGAT', 'AGGTGTGG', 'CCTTGGAA'];
      expect(service.isMutant(humanDna)).toBe(false);
    });
  });

  describe('isMutant with mutant genomas in rows', () => {
    it('should return Http 200-OK', async () => {
      const mutantDna = ['ATCGATCG', 'AAAACGAT', 'AGGTGGGG'];
      expect(service.isMutant(mutantDna)).toBe(true);
    });
  });

  describe('isMutant with mutant genomas in rows with two consecutive 4 genomas', () => {
    it('should return Http 200-OK', async () => {
      const mutantDna = ['ATCGATCG', 'AAAAAAAA', 'AGGTGTCG'];
      expect(service.isMutant(mutantDna)).toBe(true);
    });
  });

  describe('isMutant with mutant genomas in different cols', () => {
    it('should return Http 200-OK', async () => {
      const mutantDna = ['ATC', 'ATC', 'ATC', 'ATG'];
      expect(service.isMutant(mutantDna)).toBe(true);
    });
  });

  describe('isMutant with mutant genomas in cols with two consecutive 4 genomas', () => {
    it('should return Http 200-OK', async () => {
      const mutantDna = ['ATC', 'AGC', 'ATC', 'ATG', 'AAA', 'AGG', 'ACC', 'ATT'];
      expect(service.isMutant(mutantDna)).toBe(true);
    });
  });

  describe('isMutant with mutant genomas in diags from left to right in diff rows(A and C)', () => {
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

  describe('isMutant with mutant genomas in diags from left to right in diff rows(A and C)', () => {
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

  describe('isMutant with mutant consecutive genomas in diag from left to right', () => {
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

  describe('isMutant with mutant consecutive genomas one in each diag direction', () => {
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

  describe('isMutant with mutant consecutive genomas in diag from rigt to left', () => {
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

  describe('call to findDna', () => {
    it('should be null', async () => {
      repositoryMock.findOne.mockReturnValue(null);
      const queryResponse = await service.findDna('notFound');
      expect(queryResponse).toBeNull();
    });
  });

  describe('call to registerDna with a non registered dna', () => {
    it('should call find and save function and return mutantDna', async () => {
      const mutantDna = new Dna();
      mutantDna.dna = 'AAAACCCC';
      mutantDna.isMutant = true;
      const findCall = repositoryMock.findOne.mockReturnValueOnce(null);
      const saveCall = repositoryMock.save.mockReturnValueOnce(mutantDna);
      const queryResponse = await service.registerDna(['AAAACCCC']);
      expect(findCall).toBeCalled();
      expect(saveCall).toBeCalled();
      expect(queryResponse).toBe(mutantDna);
    });
  });

  describe('call to registerDna with a registered dna should return the', () => {
    it('should only call find function and return mutantDna', async () => {
      const mutantDna = new Dna();
      mutantDna.dna = 'AAAACCCC';
      mutantDna.isMutant = true;
      const findCall = repositoryMock.findOne.mockReturnValueOnce(mutantDna);
      const saveCall = repositoryMock.save.mockReturnValueOnce(null);
      const queryResponse = await service.registerDna(['AAAACCCC']);
      expect(findCall).toBeCalled();
      expect(saveCall).not.toBeCalled();
      expect(queryResponse).toBe(mutantDna);
    });
  });

  describe('call to getStats', () => {
    it('should call createQueryBuilder function and return its value', async () => {
      const QBCall = repositoryMock.createQueryBuilder.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([{ isMutant: true, count: "1" }, { isMutant: false, count: "1" }]),
      });
      const queryResponse = await service.getStats();
      expect(QBCall).toBeCalled();
      expect(queryResponse.count_mutant_dna).toBe(1);
      expect(queryResponse.count_human_dna).toBe(1);
      expect(queryResponse.ratio).toBe(1);
    });
  });
});
