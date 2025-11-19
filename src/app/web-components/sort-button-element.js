import { LitElement, html, css } from 'lit';

export class SortButtonElement extends LitElement {
    static styles = css`
        :host { display: block; width: 100%; height: auto; font-family: Arial, sans-serif;}
        .sortButton {
            width: 150px;
            /* height: 40px;  */
            background-color: #2c95e0;
            color: white;
            border-radius: 15px;
            border-color: transparent;
            font-size: 16px;
            font-weight: bold;
            padding: 4px;
        }
        .container {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }
    `;

    static properties = {
        text2: { type: String },
        royaleCards: { type: Object},
    };

    constructor() {
        super();
    }

    handleClick(typeSort) {
        if (typeSort === 'asc') {
            this.dispatchEvent(new CustomEvent('sort-cards', {
                detail: { order: 'asc' },
                bubbles: true,
                composed: true
            }));
        } else {
            this.dispatchEvent(new CustomEvent('sort-cards', {
                detail: { order: 'desc' },
                bubbles: true,
                composed: true
            }));
        }
    }

    render() {
        return html`
            <div class="container">
                <button class="sortButton" @click="${() => this.handleClick('asc')}">Ordenar de menor a mayor</button>
                <button class="sortButton" @click="${() => this.handleClick('desc')}">Ordenar de mayor a menor</button>
            </div>
                    
        `;
    }
}

customElements.define('sort-button', SortButtonElement);