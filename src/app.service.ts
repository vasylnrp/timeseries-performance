import {
  TimestreamWriteClient,
  WriteRecordsCommand,
  WriteRecordsCommandInput,
} from '@aws-sdk/client-timestream-write';
import { fromContainerMetadata } from '@aws-sdk/credential-providers';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  runCommand(): string {
    const index = 0;
    const record = {
      Dimensions: [{ Name: 'fleet', Value: 'TestingFleet' }],
      MeasureName: `test-measure #${index}`,
      MeasureValue: '12.34',
      Time: Date.now().toString(),
    };

    const writeInput: WriteRecordsCommandInput = {
      DatabaseName: 'sampleDB-single',
      TableName: 'IoT',

      Records: [record],
    };

    const writeClient = new TimestreamWriteClient({
      credentials: fromContainerMetadata(),
      region: 'eu-central-1',
    });
    writeClient.send(new WriteRecordsCommand(writeInput)).then(
      () => {
        // this.logger.debug('write response', response);
      },
      (err) => console.error('write error:', err),
    );
    return 'finished';
  }
}
