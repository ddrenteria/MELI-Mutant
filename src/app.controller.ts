import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Post('/mutant')
  isMutant(@Body() body: { dna: string[] }) {
    if(!this.appService.isMutant(body.dna)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    // return success HTTP 200-OK
    return {
      statusCode: HttpStatus.OK,
      message: 'OK'
    };
  }
}
