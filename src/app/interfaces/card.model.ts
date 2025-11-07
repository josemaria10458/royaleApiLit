export interface Card {
    items: CardItem[];
}
export interface CardItem {
    name: string;
    id: number;
    maxLevel: number;
    elixirCost: number;
    iconUrls: {
        medium: string;
    };
    rarity: string;
}