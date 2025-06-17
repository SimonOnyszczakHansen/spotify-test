import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'spotify-test';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.scrollToOpenNavigation();
  }
  
  private scrollToOpenNavigation(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => { window.scrollTo(0, 0) })
  }
}
