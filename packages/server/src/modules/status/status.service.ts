import {
  Dictionary,
  ISubscribeResponse,
  PaginationCriteria,
} from '@nest-react/domain';
import { Injectable, Logger } from '@nestjs/common';

import { ConfigService } from '~/modules/config/config.service';
import { PurchasesRepository } from '~/modules/status/purchases.repository';
import { UsersRepository } from '~/modules/status/users.repository';

@Injectable()
export class StatusService {
  private logger = new Logger(StatusService.name);
  private version: Dictionary<string>;

  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UsersRepository,
    private readonly purchaseRepository: PurchasesRepository
  ) {}

  async getFirstUser() {
    const res = await this.userRepository.get('00CM10bgtlh37flvKIkHFARjUxG3');
    return res;
  }

  async getProducts() {
    const res = await this.purchaseRepository.getProductNames();
    return res;
  }

  async getDates() {
    const res = await this.userRepository.getDates();
    return res;
  }

  async getSingleByDate(date: Date): Promise<ISubscribeResponse> {
    const downloads = await this.userRepository.getByCreatedAt(date);
    const subscribe = await this.purchaseRepository.countByDateAndProductId(date);
    const attributed = await this.purchaseRepository.countAttributedByDateAndDownloads(date, downloads);

    return {
      date: date.toLocaleDateString('en-US'),
      download: downloads.length,
      subscribe: subscribe,
      attributed: attributed,
    };
  }

  async getMultiByDates(dates: Date[]) {
    const res: ISubscribeResponse[] = [];
    for (const date of dates) {
      const row = await this.getSingleByDate(date);
      res.push(row);
    }
    return res;
  }

  async getSubscribesByPage(criteria: PaginationCriteria) {
    const dates = await this.userRepository.getDates(
      criteria.pageNo * criteria.pageSize,
      criteria.pageSize
    );
    const res = await this.getMultiByDates(
      dates.map(date => new Date(date))
    );
    return res;
  }
}
