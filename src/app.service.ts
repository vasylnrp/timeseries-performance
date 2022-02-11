import {
  TimestreamWriteClient,
  WriteRecordsCommand,
  WriteRecordsCommandInput,
} from '@aws-sdk/client-timestream-write';
import { fromInstanceMetadata, fromEnv } from '@aws-sdk/credential-providers';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  private writeClient: TimestreamWriteClient;

  private readonly logger = new Logger(AppService.name);

  runCommand(toInsert: number): string {
    this.writeClient = new TimestreamWriteClient({
      // hgach
      credentials: process.env.RUN_LOCALLY ? fromEnv() : fromInstanceMetadata(),
      region: 'eu-central-1',
    });
    for (let i = 1; i <= toInsert; i++) {
      this.insertRecord(i);
    }

    return 'finished';
  }

  private async insertRecord(index: number) {
    const record = {
      Dimensions: [
        { Name: 'vehicleId', Value: (Math.random() * 100_000).toString() },
        { Name: 'Index', Value: index.toString() },
      ],
      MeasureName: `test-measure #${Math.round(Math.random() * 20)}`,
      MeasureValue: (Math.random() * 100).toString(),
      Time: Date.now().toString(),
    };

    const writeInput: WriteRecordsCommandInput = {
      DatabaseName: 'sampleDB-single',
      TableName: 'test',

      Records: [record],
    };

    await this.writeClient.send(new WriteRecordsCommand(writeInput)).then(
      (data) => {
        // this.logger.debug('write response', data);
      },
      (err) => console.error(err),
    );
  }
}
