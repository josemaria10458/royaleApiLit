import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClanItem } from '../../interfaces/clan.model';
import { GetClansService } from '../../shared/services/get-clans.service';
import '../../web-components/table-element.js';
import '../../web-components/pagination-element.js';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TableComponent {
  totalClans: number = 0;
  clans: ClanItem[] = [];
  pageSize = 10;
  currentPage = 0;
  constructor(private clanService: GetClansService) {
    this.getClanData();
  }

  getClanData(){
    this.clanService.getClans().subscribe({
      next: data => {
        this.clans = data?.items || [];
        localStorage.setItem('clanData', JSON.stringify(data?.items || []));
        this.totalClans = this.clans.slice(0,100).length;
        this.setPage(0);
      },
      error: err => console.error(err)
    });
  }

  setPage(page: number) {
    if (page === 0) {
      this.currentPage = page;
      const start = page * this.pageSize;
      this.clans = this.clans.slice(start, start + this.pageSize);
    } else {
      this.clans = localStorage.getItem('clanData') ? JSON.parse(localStorage.getItem('clanData') || '') : [];
      this.currentPage = page;
      const start = page * this.pageSize;
      this.clans = this.clans.slice(start, start + this.pageSize);
    }
    
  }

  onPageChange(event: any) {
    const page = event.detail.page;
    this.setPage(page);
  }
}
