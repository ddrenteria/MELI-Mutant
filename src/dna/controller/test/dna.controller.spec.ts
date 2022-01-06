import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DnaController } from '../dna.controller';
import { DnaService } from '../../service/dna.service';
import { Dna } from '../../../dna/dna.entity';

describe('DnaController', () => {
  let controller: DnaController;
  let service: DnaService;

  const humanDnaMock = new Dna();
  humanDnaMock.dna = 'AAAA';
  humanDnaMock.isMutant = false;

  const mutantDnaMock = new Dna();
  mutantDnaMock.dna = 'AAAACCCC';
  mutantDnaMock.isMutant = true;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DnaController],
      providers: [{ 
        provide: DnaService,
        useValue: { registerDna: jest.fn(), getStats: jest.fn() } 
      }],
    }).compile();

    service = module.get<DnaService>(DnaService);
    controller = module.get<DnaController>(DnaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST: /Mutant with empty dna(human)',() => {
    it('should throw Forbidden', () => {
      jest.spyOn(service, 'registerDna').mockReturnValueOnce(Promise.resolve(humanDnaMock));
      const emptyDna = [];
      try {
        controller.isMutant({ dna: emptyDna })
      } catch(error) {
        expect(error.message).toBe('Forbidden');
      }
    });
  });

  describe('POST: /Mutant with mutant genomas in rows', () => {
    it('should return Http 200-OK', async () => {
      jest.spyOn(service, 'registerDna').mockReturnValueOnce(Promise.resolve(mutantDnaMock));
      const mutantDna = ['ATCGATCG', 'AAAACGAT', 'AGGTGGGG'];
      const response = await controller.isMutant({ dna: mutantDna });
      expect(response.statusCode).toBe(HttpStatus.OK);
    });
  });

  describe('GET: /getStats', () => {
    it('should return stats from service', async () => {
      jest.spyOn(service, 'getStats').mockReturnValueOnce(Promise.resolve({
        count_mutant_dna: 1,
        count_human_dna: 1,
        ratio: 1
      }));
      const response = await controller.getStats();
      expect(response.count_mutant_dna).toBe(1);
      expect(response.count_human_dna).toBe(1);
      expect(response.ratio).toBe(1);
    });
  });
});
