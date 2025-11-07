import { HttpClient } from "@angular/common/http";
import { Card } from "../../interfaces/card.model";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class GetCardsService {
    cards: Card[] = [];
    apiUrl: string = 'http://localhost:3000/cards';

  constructor(private http: HttpClient) { 
    this.getData();
  }
    getData(): Observable<Card[]> {
        return this.http.get<Card[]>(this.apiUrl);
    }
}