import { Module } from '@nestjs/common';
import { DnaService } from './service/dna.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DnaController } from './controller/dna.controller';
import { Dna } from './dna.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dna])],
  controllers: [DnaController],
  providers: [DnaService]
})
export class DnaModule {}
