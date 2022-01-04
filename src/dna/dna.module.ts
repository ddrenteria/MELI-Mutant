import { Module } from '@nestjs/common';
import { DnaService } from './service/dna.service';
import { DnaController } from './controller/dna.controller';

@Module({
  controllers: [DnaController],
  providers: [DnaService]
})
export class DnaModule {}
