import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AppService } from './app.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Inject()
  private readonly appService: AppService;

  @Cron(CronExpression.EVERY_5_SECONDS)
  handleCron() {
    this.appService.runCommand(6_000);
    this.logger.debug('inserted 6,000 every 5 seconds');
  }
}
