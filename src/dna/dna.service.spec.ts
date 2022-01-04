import { Test, TestingModule } from '@nestjs/testing';
import { DnaService } from './dna.service';

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
});
