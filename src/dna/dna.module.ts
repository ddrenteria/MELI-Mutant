import { Module } from '@nestjs/common';
import { DnaService } from './dna.service';
import { DnaController } from './dna.controller';

@Module({
  controllers: [DnaController],
  providers: [DnaService]
})
export class DnaModule {}
