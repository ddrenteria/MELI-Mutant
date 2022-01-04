import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { DnaService } from './dna.service';

@Controller('mutant')
export class DnaController {
  constructor(private readonly dnaService: DnaService) {}

  @Post()
  isMutant(@Body() body: { dna: string[] }) {
    if(!this.dnaService.isMutant(body.dna)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    // return success HTTP 200-OK
    return {
      statusCode: HttpStatus.OK,
      message: 'OK'
    };
  }
}
