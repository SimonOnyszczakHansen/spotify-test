import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  tracks: any[] = [];

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.loadTopTracks('3TVXtAsR1Inumwj472S9r4');
  }

  loadTopTracks(id: string) {
    this.spotifyService.getArtistTopTracks(id).subscribe((top: any) => {
      this.tracks = top.tracks;
    })
  }
}
