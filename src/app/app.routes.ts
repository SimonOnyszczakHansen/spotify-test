import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MusicComponent } from './components/music/music.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { NewsComponent } from './components/news/news.component';
import { ConcertsComponent } from './components/concerts/concerts.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
    {path: '', redirectTo: 'hjem', pathMatch: 'full'},
    {path: 'hjem', component: HomeComponent},
    {path: 'musik', component: MusicComponent},
    {path: 'kontakt', component: ContactComponent},
    {path: 'om', component: AboutComponent},
    {path: 'pressemeddelse', component: NewsComponent},
    {path: 'koncerter', component: ConcertsComponent},
    {path: 'admin', component: AdminDashboardComponent},
    {path: 'callback', component: HomeComponent},
];
