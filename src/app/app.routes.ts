import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MusicComponent } from './music/music.component';

export const routes: Routes = [
    {path: '', redirectTo: 'hjem', pathMatch: 'full'},
    {path: 'hjem', component: HomeComponent},
    {path: 'musik', component: MusicComponent},
    {path: 'callback', component: HomeComponent},
];
