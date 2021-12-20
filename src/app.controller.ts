import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/mutant')
  isMutant(@Body() body: { dna: string[] }): boolean {
    return this.appService.isMutant(body.dna);
  }
}
