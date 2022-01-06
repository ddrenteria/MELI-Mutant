import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { DnaService } from '../service/dna.service';

@Controller('')
export class DnaController {
  constructor(private readonly dnaService: DnaService) {}

  @Get('getStats')
  async getStats() {
    return await this.dnaService.getStats();
  }

  @Post('mutant')
  async isMutant(@Body() body: { dna: string[] }) {
    let dna = await this.dnaService.registerDna(body.dna);

    if(!dna.isMutant) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    // return success HTTP 200-OK
    return {
      statusCode: HttpStatus.OK,
      message: 'OK'
    };
  }
}
