import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleEvent } from './pg/model/VehicleEvent.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VehicleEventService {
  constructor(
    @InjectRepository(VehicleEvent)
    private readonly repo: Repository<VehicleEvent>,
  ) {}

  public async getAll() {
    return await this.repo.find();
  }
}
