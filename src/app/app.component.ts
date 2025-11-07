import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { HeaderComponent } from './components/header/header.component.js';
import { CardsComponent } from "./components/cards/cards.component";
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, CardsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA ] 
})
export class AppComponent {
  title = 'royaleApiLit';

  @ViewChild('cards', { static: true }) cardsEl!: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    // Asigna la propiedad JS del web component
    if (this.cardsEl?.nativeElement) {
      (this.cardsEl.nativeElement as any).text = this.title;
    }
  }

  constructor(private router: Router) {}

  onNavigate(event: any) {
    const path = event?.detail ?? event;
    if (typeof path === 'string') {
      this.router.navigateByUrl(path);
    }
  }

}
