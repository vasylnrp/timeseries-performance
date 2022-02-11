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

  private writeClient: TimestreamWriteClient;

  runCommand(): string {
    // for (let i = 0; i < 100; i++) {
    // }
    console.log('test');
    this.writeClient = new TimestreamWriteClient({
      // TODO here depends on ENV var
      // hgach
      credentials: fromInstanceMetadata(),
      region: 'eu-central-1',
    });
    this.insertRecord(0);

    return 'finished';
  }

  private insertRecord(index: number) {
    if (index > 1000) return;
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

    this.writeClient.send(new WriteRecordsCommand(writeInput)).then(
      () => {
        this.insertRecord(index + 1);
        // this.logger.debug('write response', response);
      },
      (err) => console.error('write error:', err),
    );
  }
}
