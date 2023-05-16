export class PaginationCriteria {
  pageNo = 0;
  pageSize = 10;
  filter: any = null;

  constructor(pageNo: number, pageSize: number, filter: any) {
    this.pageNo = pageNo;
    this.pageSize = pageSize;
    this.filter = filter;
  }
}
