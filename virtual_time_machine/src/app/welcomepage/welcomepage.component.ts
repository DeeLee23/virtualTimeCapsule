import { Component } from '@angular/core';

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrl: './welcomepage.component.css'
})
export class WelcomepageComponent {
  constructor() { }

  loginWithGoogle(): void {
    window.location.href = 'http://localhost:8080/auth/google';
  }
}
