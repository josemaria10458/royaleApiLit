import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

export class TagTypeElement extends LitElement {
    static styles = [
        css`
            :host {
                
            }

            .type.open {
                background-color: #afdea2;
                border-radius: 10px;
                font-size: 12px;
                padding: 6px;
                padding-left: 8px;
                padding-right:10px;
                font-weight: bold;
            }

            .type.inviteOnly {
                background-color: #f8dda8;
                border-radius: 10px;
                font-size: 12px;
                padding: 6px;
                padding-left: 8px;
                padding-right:10px;
                font-weight: bold;
            }

            .type.closed {
                background-color: #f8a8a8;
                border-radius: 10px;
                font-size: 12px;
                padding: 6px;
                padding-left: 8px;
                padding-right:10px;
                font-weight: bold;
            }


        `
    ];

    static properties = {
       clanType: { type: String },
    }

    constructor() {
        super();
        this.clanType = '';
    }

    _showType(type){
        if (type === 'open') {
            return 'Abierto'
        } else if (type === "inviteOnly"){
            return 'Solo invitación'
        } else {
            return 'Cerrado'
        }
    }

    render() {
        return html`
            <span class="type ${this.clanType}">
                ${this._showType(this.clanType)}
            </span>
        `;
    }
}

customElements.define('tag-element', TagTypeElement);
