import { LitElement, html, css } from 'lit';

export class CardsElement extends LitElement {
    static styles = css`
        :host { display: block; width: 100%; height: auto; font-family: Arial, sans-serif;}
        .container {
            width: 100%;
            height: 100vh; 
            display: grid;
            flex-direction: row;
            /* background-color: this.royaleCards.rarity */
        }
        .card-container { width: 300px; margin: 20px auto; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); border-radius:10px; background:#fff; }
        .card-container.common { background: #fde3be; }
        .card-container.rare { background: #dbeafe; }       
        .card-container.epic { background: #ede9fe; }
        .card-container.champion { background: #fcfcc6; }         
        .card-container.legendary { background: linear-gradient(90deg,#ffd27a,#ff9a3c); color:#000; }
        .imageCard {
            width: 200px;
            height: 240px;
        }

    `;

    static properties = {
        text2: { type: String },
        royaleCards: { type: Object},
    };

    constructor() {
        super();
        this.text2 = '';
        this.royaleCards = {};
        console.log('royale', this.royaleCards);
        // this.handleSort = this.handleSort.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        // Escuchar el evento cuando el componente se monta
        this.addEventListener('sort-cards', this.handleSort);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        // Limpiar el listener cuando el componente se desmonta
        this.removeEventListener('sort-cards', this.handleSort);
    }

    render() {
        return html`
        
                <div class="card-container ${this.royaleCards.rarity.toLowerCase()}">
                    <strong>${this.royaleCards.name}</strong>
                    <div>Rarity: ${this.royaleCards.rarity}</div>
                    <div>Elixir cost: ${this.royaleCards.elixirCost}</div>
                    <img src="${this.royaleCards.iconUrls?.medium || ''}" alt="${this.royaleCards.name}" class="imageCard" />
                </div>
                    
        `;
    }
}

customElements.define('cards-element', CardsElement);