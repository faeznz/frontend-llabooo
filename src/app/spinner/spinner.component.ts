import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  isMenuOpen: boolean = false;
  loading: boolean = false;
  value = Math.ceil(Math.random() * 3600);

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  hideMenu() {
    this.isMenuOpen = false;
  }

  spin() {
    this.value += Math.ceil(Math.random() * 3600);
  }
}
