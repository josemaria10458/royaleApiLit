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
  // cards: CardItem[] = [
  //       {
  //           "name": "Knight",
  //           "id": 26000000,
  //           "maxLevel": 14,
  //           // "maxEvolutionLevel": 1,
  //           "elixirCost": 3,
  //           "iconUrls": {
  //               "medium": "https://api-assets.clashroyale.com/cards/300/jAj1Q5rclXxU9kVImGqSJxa4wEMfEhvwNQ_4jiGUuqg.png",
  //               // "evolutionMedium": "https://api-assets.clashroyale.com/cardevolutions/300/jAj1Q5rclXxU9kVImGqSJxa4wEMfEhvwNQ_4jiGUuqg.png"
  //           },
  //           "rarity": "common"
  //       },
  //       {
  //           "name": "Archers",
  //           "id": 26000001,
  //           "maxLevel": 14,
  //           // "maxEvolutionLevel": 1,
  //           "elixirCost": 3,
  //           "iconUrls": {
  //               "medium": "https://api-assets.clashroyale.com/cards/300/W4Hmp8MTSdXANN8KdblbtHwtsbt0o749BbxNqmJYfA8.png",
  //               // "evolutionMedium": "https://api-assets.clashroyale.com/cardevolutions/300/W4Hmp8MTSdXANN8KdblbtHwtsbt0o749BbxNqmJYfA8.png"
  //           },
  //           "rarity": "common"
  //       },
  //       {
  //           "name": "Goblins",
  //           "id": 26000002,
  //           "maxLevel": 14,
  //           "elixirCost": 2,
  //           "iconUrls": {
  //               "medium": "https://api-assets.clashroyale.com/cards/300/X_DQUye_OaS3QN6VC9CPw05Fit7wvSm3XegXIXKP--0.png"
  //           },
  //           "rarity": "common"
  //       },
  //       {
  //           "name": "Giant",
  //           "id": 26000003,
  //           "maxLevel": 12,
  //           "elixirCost": 5,
  //           "iconUrls": {
  //               "medium": "https://api-assets.clashroyale.com/cards/300/Axr4ox5_b7edmLsoHxBX3vmgijAIibuF6RImTbqLlXE.png"
  //           },
  //           "rarity": "rare"
  //       },
  //       {
  //           "name": "P.E.K.K.A",
  //           "id": 26000004,
  //           "maxLevel": 9,
  //           // "maxEvolutionLevel": 1,
  //           "elixirCost": 7,
  //           "iconUrls": {
  //               "medium": "https://api-assets.clashroyale.com/cards/300/MlArURKhn_zWAZY-Xj1qIRKLVKquarG25BXDjUQajNs.png",
  //               // "evolutionMedium": "https://api-assets.clashroyale.com/cardevolutions/300/MlArURKhn_zWAZY-Xj1qIRKLVKquarG25BXDjUQajNs.png"
  //           },
  //           "rarity": "epic"
  //       },
  // ];
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
