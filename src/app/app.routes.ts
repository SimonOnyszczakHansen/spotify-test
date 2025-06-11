import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MusicComponent } from './components/music/music.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
    {path: '', redirectTo: 'hjem', pathMatch: 'full'},
    {path: 'hjem', component: HomeComponent},
    {path: 'musik', component: MusicComponent},
    {path: 'kontakt', component: ContactComponent},
    {path: 'callback', component: HomeComponent},
];
