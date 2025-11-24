import { LitElement, html, css } from 'lit';

export class DragAndDropElement extends LitElement {
    static styles = css`
        :host { width: 100%; height: auto; font-family: Arial, sans-serif;}
        .dragContainer {
            height: auto;
            background-color: #f0f0f0;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 45px;
            padding: 30px;
            place-items: center;
            margin-top: 40px;
            padding-top: 70px;
            padding-bottom: 70px;
        }

        .dragCard {
            width: 200px;
            height: 240px;
            background-color: #d3cfcf;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

    `;

    static properties = {
        dragCards: { type: Array},
    };

    constructor() {
        super();
        this.dragCards = Array.from({ length: 8 });
        // const dragCardElements = document.getElementById('dragCard');
        // dragCardElements.addEventListener('dragstart', dragging);
        this._onDragStart = this._onDragStart.bind(this);
        this._onDragOver = this._onDragOver.bind(this);
        this._onDrop = this._onDrop.bind(this);
        this._onDragEnd = this._onDragEnd.bind(this);
    }

    render() {
        return html`
            <div class="dragContainer">
                ${this.dragCards.map(() => html`
                    <div 
                        class="dragCard" 
                        id="dragCard"
                        @dragstart=${this._onDragStart}
                        @dragover=${this._onDragOver}
                        @drop=${this._onDrop}
                        @dragend=${this._onDragEnd}></div>
                    </div>
                `)}
            </div>
                    
        `;
    }

      _onDragStart(e) {
        const idx = e.currentTarget?.dataset?.index;
        e.dataTransfer?.setData('text/plain', String(idx));
        e.dataTransfer.effectAllowed = 'move';
        e.currentTarget.classList.add('dragging');
    }

    _onDragOver(e) {
        // necesario para permitir el drop
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    _onDrop(e) {
        e.preventDefault();
        const from = Number(e.dataTransfer?.getData('text/plain'));
        const to = Number(e.currentTarget?.dataset?.index);
        if (isNaN(from) || isNaN(to) || from === to) return;

        // swap or reorder
        const newArr = [...this.dragCards];
        const [moved] = newArr.splice(from, 1);
        newArr.splice(to, 0, moved);
        this.dragCards = newArr;
        this.requestUpdate();
    }

    _onDragEnd(e) {
        // limpiar clase visual
        const items = this.renderRoot.querySelectorAll('.dragCard.dragging');
        items.forEach(it => it.classList.remove('dragging'));
    }
}

customElements.define('drag-element', DragAndDropElement);