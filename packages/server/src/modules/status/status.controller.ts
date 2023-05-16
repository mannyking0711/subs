import { PaginationCriteria } from '@nest-react/domain';
import { BadRequestException, Controller, Get, Query } from '@nestjs/common';

import { StatusService } from './status.service';

@Controller()
export class StatusController {
  // Constructor ---------------------------------------------------------------
  constructor(private readonly statusService: StatusService) {}
  // ---------------------------------------------------------------------------

  // Requests ------------------------------------------------------------------
  @Get('/products')
  async getProducts() {
    const res = await this.statusService.getProducts();
    return res;
  }

  @Get('/dates')
  async getDates() {
    const res = await this.statusService.getDates();
    return res;
  }

  @Get('/page')
  async getRowByDate(
    @Query('pageNo') pageNo: number,
    @Query('pageSize') pageSize: number
  ) {
    const res = await this.statusService.getSubscribesByPage(
      new PaginationCriteria(pageNo, pageSize, null)
    );
    return res;
  }
  // ---------------------------------------------------------------------------
}
