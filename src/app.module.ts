import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DnaModule } from './dna/dna.module';

@Module({
  imports: [TypeOrmModule.forRoot(), DnaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
