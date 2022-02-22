import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PgService } from 'src/pg.service';
import { VehicleEvent } from 'src/pg/model/VehicleEvent.entity';
import { BaseEntity } from 'typeorm';
import { PgController } from './pg.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleEvent]), BaseEntity],
  providers: [PgService],
  controllers: [PgController],
  exports: [PgService],
})
export class PgModule {}
