import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { DnaService } from '../service/dna.service';

@Controller('mutant')
export class DnaController {
  constructor(private readonly dnaService: DnaService) {}

  @Post()
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
