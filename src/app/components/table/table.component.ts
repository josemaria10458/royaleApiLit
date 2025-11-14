import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Clan, ClanItem, InitializeClan } from '../../interfaces/clan.model';
import { GetClansService } from '../../shared/services/get-clans.service';
import '../../web-components/table-element.js';


@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TableComponent {

  clans: ClanItem[] = [];
  constructor(private clanService: GetClansService) {
    this.getClanData();
  }

  getClanData(){
     this.clanService.getClans().subscribe((data) => {
      this.clans = data.items;
      console.log('Clans data:', this.clans);
    });
  }

}
