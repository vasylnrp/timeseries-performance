import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AppService } from './app.service';
import { PgService } from './pg.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Inject()
  private readonly appService: AppService;

  @Inject()
  private readonly pgService: PgService;

  @Cron(CronExpression.EVERY_5_SECONDS)
  handleCron() {
    // this.appService.runCommand(5_000);
    this.pgService.runCommand(1000);
    this.logger.debug('inserted 1000 every 5 seconds');
  }
}
