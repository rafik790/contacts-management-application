import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrls: ['./custom-pagination.component.css']
})
export class CustomPaginationComponent {
  @Input() totalRecords = 0;
  @Input() recordsPerPage = 0;
  @Output() onPageChange: EventEmitter<number> = new EventEmitter();
  public pages: number[] = [];
  public pageCount: number;
  public activePage: number;
  public hideFirst: number;
  public hideLast: number;

  ngOnChanges(): void {
    this.pageCount = this.getPageCount();
    this.pages = this.getArrayOfPage(this.pageCount);
    this.activePage = 1;
    this.hidePages();
    this.onPageChange.emit(1);
  }

  private getPageCount(): number {
    let totalPage = 0;
    if (this.totalRecords > 0 && this.recordsPerPage > 0) {
      const pageCount = this.totalRecords / this.recordsPerPage;
      const roundedPageCount = Math.floor(pageCount);
      totalPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;
    }
    return totalPage;
  }

  private getArrayOfPage(pageCount: number): number[] {
    const pageArray = [];
    if (pageCount > 0) {
      for (let i = 1; i <= pageCount; i++) {
        pageArray.push(i);
      }
    }
    return pageArray;
  }

  onClickPage(pageNumber: number): void {
    
    if (pageNumber >= 1 && pageNumber <= this.pages.length) {
      this.activePage = pageNumber;
      this.hideFirst = 0;
      this.hideLast = 0;

      this.hidePages();
      this.onPageChange.emit(this.activePage);
    }
  }

  private hidePages(): void {
    if (this.activePage === 1 || this.activePage <= 3) {
      this.hideLast = 6;
    } else if (
      this.activePage === this.pageCount ||
      this.activePage >= this.pageCount - 2
    ) {
      this.hideFirst = this.pageCount - 5;
    } else if (this.activePage > 3 && this.activePage < this.pageCount - 2) {
      this.hideFirst = this.activePage - 3;
      this.hideLast = this.activePage + 3;
    }
  }
}
