import { HttpClient, HttpParams } from "@angular/common/http";
import { Card } from "../../interfaces/card.model";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Clan, InitializeClan } from "../../interfaces/clan.model";


@Injectable({
  providedIn: 'root'
})
export class GetClansService {
  cards: Clan = InitializeClan();
  apiUrl: string = 'http://localhost:3000/clans';
  params = new HttpParams().set('minMembers', '20');
  constructor(private http: HttpClient) { 
    this.getClans();
  }

  getClans(): Observable<Clan> {
      return this.http.get<Clan>(this.apiUrl, {params: this.params});
  }
}