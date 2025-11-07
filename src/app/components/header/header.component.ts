import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '../../web-components/navbar-element.js';


@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderComponent {

}
