import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  constructor(private router: Router) {}

  goToEditNews() {
    this.router.navigate(['admin/rediger-pressemeddelelser'])
  }

  goToEditSongs() {
    
  }

  goToEditConcerts() {

  }
}
