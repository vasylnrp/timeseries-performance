import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AppService } from './app.service';
import { PgService } from './pg/pg.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Inject()
  private readonly appService: AppService;

  @Inject()
  private readonly pgService: PgService;

  @Cron(CronExpression.EVERY_5_SECONDS)
  handleCron() {
    const toInsert = parseInt(process.env.INSERT_PER_5_SECONDS);
    this.pgService.runCommand(toInsert);
    this.logger.debug(`insert ${toInsert} every 5 seconds`);
  }
}
