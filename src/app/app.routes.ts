import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MusicComponent } from './components/music/music.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { NewsComponent } from './components/news/news.component';
import { ConcertsComponent } from './components/concerts/concerts.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { EditNewsComponent } from './components/admin/edit-news/edit-news.component';
import { EditSongsComponent } from './components/admin/edit-songs/edit-songs.component';
import { EditConcertsComponent } from './components/admin/edit-concerts/edit-concerts.component';

export const routes: Routes = [
    {path: '', redirectTo: 'hjem', pathMatch: 'full'},
    {path: 'hjem', component: HomeComponent},
    {path: 'musik', component: MusicComponent},
    {path: 'kontakt', component: ContactComponent},
    {path: 'om', component: AboutComponent},
    {path: 'pressemeddelse', component: NewsComponent},
    {path: 'koncerter', component: ConcertsComponent},
    {path: 'admin', component: AdminDashboardComponent},
    {path: 'admin/rediger-pressemeddelelser', component: EditNewsComponent},
    {path: 'admin/rediger-sang-beskrivelse', component: EditSongsComponent},
    {path: 'admin/rediger-koncerter', component: EditConcertsComponent},
    {path: 'callback', component: HomeComponent},
];
