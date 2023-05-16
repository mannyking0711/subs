import { Module } from '@nestjs/common';
import { PurchasesRepository } from '~/modules/status/purchases.repository';
import { UsersRepository } from '~/modules/status/users.repository';

import { StatusController } from './status.controller';
import { StatusService } from './status.service';

@Module({
  controllers: [StatusController],
  providers: [StatusService, UsersRepository, PurchasesRepository],
})
export class StatusModule {}
