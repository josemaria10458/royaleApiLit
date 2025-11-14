import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild } from '@angular/core';
import '../../web-components/cards-elements.js';
import '../../web-components/sort-button-element.js';
import { Card, CardItem } from '../../interfaces/card.model.js';
import { GetCardsService } from '../../shared/services/get-cards.service.js';


@Component({
  selector: 'app-cards',
  imports: [],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: []
})
export class CardsComponent implements OnInit{
  cards: CardItem[] = [];
  texto: string = 'HOLAA'
  @ViewChild('cardsElement', { static: true }) cardsElement!: ElementRef<any>;

  constructor(private getCardsService: GetCardsService) {}

   ngOnInit(): void {
    this.getCardsService.getData().subscribe({
      next: (data: any) => {    
        this.cards = data.items;

        const el = this.cardsElement?.nativeElement as any;
        if (el) {
          el.royaleCards = this.cards;
          el.text2 = this.texto;
          // si tu web component expone requestUpdate, puedes llamar:
          if (typeof el.requestUpdate === 'function') el.requestUpdate();
        }
      },
      error: (err) => console.error('Error fetching cards data', err)
    });
  }

  handleSort(event: any) {
    const { order = 'asc' } = event.detail ?? {};
    this.cards = this.cards.sort((a,b) => {
      const item: number = a.elixirCost;
      const itemB: number = b.elixirCost;

      return order === 'asc' ? item - itemB : itemB - item;
    });
  }
}
