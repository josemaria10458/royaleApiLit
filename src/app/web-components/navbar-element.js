import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

export class NavBarElement extends LitElement {
    static styles = [
        css`
            :host {
                /* width: 97%; */
                display: flex;
                flex-direction: row;
                align-items: center;
                /* justify-content: space-between; */
                font-family: Arial, sans-serif;
                background-color: white;
                padding: 10px;
                border: 1px solid transparent;
                border-radius: 50px;
                padding: 10px;
                z-index: 1;
                /* font-family: Arial, sans-serif;  */
                margin: 30px;
                position: sticky;
                top: 10px;
            }

            .header-container {
                width: 98%;
                display: flex;
                justify-content: space-between;
                gap: 50px;
                flex-direction: row;
                align-items: center;
                gap: 20px;
                margin: 10px;
                padding: 10px;
                /* background-image: radial-gradient(circle at top left, #ffcccc, #ffe6e6); */
            }

            .nav-links {
                display: flex;
                gap: 20px;
            }

            span{
                cursor: pointer;
                font-weight: bold;
                font-size: 22px;
            }

            :host([scrolled]) {
                background-color: rgba(255,255,255,0.6);
                box-shadow: 0 6px 18px rgba(0,0,0,0.12);
                backdrop-filter: blur(6px);
            }
        `
    ];

    static properties = {
       counter: { type: Number },
       scrolled: { type: Boolean, reflect: true }
    }

    constructor() {
        super();
        this.counter = 0;
        this._onScroll = this._onScroll.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('scroll', this._onScroll, { passive: true });
        // comprobar estado inicial (por si la página ya está scrolleada)
        this._onScroll();
    }

    disconnectedCallback() {
        window.removeEventListener('scroll', this._onScroll);
        super.disconnectedCallback();
    }

    _onScroll() {
        const threshold = 50; // píxeles de scroll para activar transparencia
        this.scrolled = window.scrollY > threshold;
    }

    render() {
        return html`
        <div class="header-container">
            <h2>Clash Royale</h2>
            <div class="nav-links">
                <span name="nav-link-1">Cartas</span>
                <span name="nav-link-1">Mazos</span>

                <!-- <span name="nav-link-3">Experiencia</span>
                <span name="nav-link-3">Lenguajes</span>
                <span name="nav-link-2">Contacto</span>
            </div> -->
        </div>
            
        `;
    }

    _incrementCounter() {
        this.counter++;
    }
}

customElements.define('navbar-element', NavBarElement);
