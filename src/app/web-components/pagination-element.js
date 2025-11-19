import { LitElement, html, css } from 'lit';

export class PaginationElement extends LitElement {
    static styles = css`
        :host {     
            width: 80%;
            display: flex;
            justify-content: end; font-family: Arial, sans-serif;
        }
        .container {
            background-color: #f3f4f6;
            width: auto;
            height: 40px;
            display: flex;
            flex-direction: row;
            gap: 4px;
            align-items: center;
            padding: 4px;
            border-radius: 6px;
        }

        button {
            min-width: 32px;
            height: 32px;
            border: 1px solid;
            background: #fff;
            border-radius: 4px;
            cursor: pointer;
        }

        button:focus {
            background-color: #5e86d4;
            color: white;
            outline: none;
        }

        .ellipsis {
            padding: 0 8px;
            color: #666;
            user-select: none;
        }
    `;

    static properties = {
        numberofElements: {type : Number},
        pages: {type: Array}
    };

    constructor() {
        super();
        this.numberofElements = 0;
        //Creamos a partir de un numero un array
        this.pages = Array.from({ length: this.numberofElements / 10 }, (_, index) => index + 10);
    }

    updated(changedProps) {
        if (changedProps.has('numberofElements')) {
            const total = Math.max(0, Number(this.numberofElements) || 0);
            const pageSize = 10;
            const count = Math.ceil(total / pageSize);

            if (count <= 5) {
                // mostrar todas las páginas si son 5 o menos
                this.pages = Array.from({ length: count }, (_, i) => i + 1);
            } else {
                // mostrar: 1,2,3,...,last
                this.pages = [
                    1,
                    2,
                    3,
                    4,
                    5,
                    '...',
                    count
                ];
            }
        }
    }

    _onPageClick(page) {
        if (page >= 4 && page < this.pages[this.pages.length - 1] - 1) {
            this.pages = [
                1,
                '...',
                // page - 2,
                page - 1,
                page,
                page + 1,
                // page + 2,
                '...',
                this.pages[this.pages.length - 1]
            ];
        }
        this.dispatchEvent(new CustomEvent('current-page', {
            detail: { page: page },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
            <div class="container">
                ${this.pages.map(p => typeof p === 'string' 
                ? html`<span class="ellipsis">${p}</span>`
                : html`<button @click=${() => this._onPageClick(p)}>${p}</button>`
                )}        
            </div>         
        `;
    }
}

customElements.define('pagination-element', PaginationElement);