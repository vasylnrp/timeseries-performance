import {
  TimestreamWriteClient,
  WriteRecordsCommand,
  WriteRecordsCommandInput,
} from '@aws-sdk/client-timestream-write';
import { fromInstanceMetadata, fromEnv } from '@aws-sdk/credential-providers';
import { Injectable, Logger } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { InsertValuesMissingError, Repository } from 'typeorm';
import { VehicleEvent } from './model/VehicleEvent.entity';

@Injectable()
export class PgService {
  private writeClient: TimestreamWriteClient;

  private readonly logger = new Logger(PgService.name);

  constructor(
    @InjectRepository(VehicleEvent)
    private readonly repo: Repository<VehicleEvent>,
  ) {}

  getHello(): string {
    return 'Hello World from pg service!';
  }

  public async getAll() {
    // return await this.repo.find();

    return await this.repo.count();
    // return await this.repo.findOne();
    // return await this.repo.find({
    // select: ['id', 'from', 'title', 'articleID', 'url', 'createdAt', 'updatedAt'],
    //   order: {
    //     createDateTime: 'DESC',
    //   },
    //   take: 3,
    // });
  }

  public async create(entity) {
    const newEntity = await this.repo.create(entity);
    return await this.repo.save(newEntity);
  }

  runCommand(toInsert: number): string {
    // hgach
    for (let i = 1; i <= toInsert; i++) {
      this.insertRecord(i);
    }
    return 'finished';
  }

  private async insertRecord(index: number) {
    const record = {
      vehicleId: 'vehicle-' + Math.round(Math.random() * 100_000).toString(),
      measureName: `test-measure #${Math.round(Math.random() * 20)}`,
      measureValue: (Math.random() * 100).toString() + 'index-' + index,
    };

    await this.create(record);
  }
}
