import {
  TimestreamWriteClient,
  WriteRecordsCommand,
  WriteRecordsCommandInput,
} from '@aws-sdk/client-timestream-write';
import { fromInstanceMetadata } from '@aws-sdk/credential-providers';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  runCommand(): string {
    for (let i = 0; i < 100; i++) {
      this.insertRecord(i);
    }
    return 'finished';
  }

  private insertRecord(index: number) {
    const record = {
      Dimensions: [{ Name: 'fleet', Value: 'TestingFleet' }],
      MeasureName: `test-measure #${index}`,
      MeasureValue: (Math.random() * 100).toString(),
      Time: Date.now().toString(),
    };

    const writeInput: WriteRecordsCommandInput = {
      DatabaseName: 'sampleDB-single',
      TableName: 'IoT',

      Records: [record],
    };

    const writeClient = new TimestreamWriteClient({
      credentials: fromInstanceMetadata(),
      region: 'eu-central-1',
    });
    writeClient.send(new WriteRecordsCommand(writeInput)).then(
      () => {
        // this.logger.debug('write response', response);
      },
      (err) => console.error('write error:', err),
    );
  }
}
