import { Controller, Get } from '@nestjs/common';
import { PgService } from 'src/pg/pg.service';

@Controller('pg')
export class PgController {
  constructor(private readonly service: PgService) {}

  @Get()
  async getHello() {
    // this.service.create({
    //   vehicleId: 'vehicle-01',
    //   measureName: 'measure-1',
    //   measureValue: '123.456',
    // });

    return this.service.getAll();
  }
}
