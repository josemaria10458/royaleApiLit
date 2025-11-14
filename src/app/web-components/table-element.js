import { LitElement, html, css } from 'lit';
import './tag-type-element.js'

export class TableElement extends LitElement {
    static styles = css`
        :host { display: block; width: 100%; height: auto; font-family: Arial, sans-serif;}
        .table-container{
            /* width: 100%; */
            height: 800px;
            /* overflow-x: hidden; */

        }

        .cabecera {
            /* width: auto; */
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .table {
            width: 90%;
            margin: 60px;
            border: 2px solid #d3d2d2;
            border-radius: 15px;
            padding: 10px;
        }
        thead {
            border-bottom: 5px solid black;
        }

        .col{
            justify-content: center;
            text-align: center;
            padding: 10px;
        }

    `;

    static properties = {
        clans: { type: Array},
    };

    constructor() {
        super();
        this.clans = []
        console.log(this.clans);
        
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
            <div class="table-container">
                <table class="table">
                    <thead>
                        <th>Nombre</th>
                        <th>Tag</th>
                        <th>Score</th>
                        <th>Trofeos de guerra</th>
                        <th>Members</th>
                        <th>Tipo</th>
                        <th>Donaciones</th>
                    </thead>
                    <td colspan="7">
                        <hr> <!-- La línea horizontal se inserta aquí -->
                    </td>
                    <tbody>
                        ${this.clans.map((clan)=>{
                                return html`
                                    <tr>
                                        <td class="col">${clan.name}</td>
                                        <td class="col">${clan.tag}</td>
                                        <td class="col">${clan.clanScore}</td>
                                        <td class="col">${clan.clanWarTrophies}</td>
                                        <td class="col">${clan.members}</td>
                                        <td class="col">
                                            <tag-element .clanType="${clan.type}"></tag-element>
                                        </td>
                                        <td class="col">${clan.donationsPerWeek}</td>
                                    </tr>
                                `
                        })}
                    </tbody>
                </table>
            </div>
        `;
    }
}

customElements.define('table-element', TableElement);