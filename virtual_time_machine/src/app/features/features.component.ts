import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
export class FeaturesComponent {
  constructor(private router: Router) {}

  navigateToCreate() {
    this.router.navigate(['/create']);
  }
}
