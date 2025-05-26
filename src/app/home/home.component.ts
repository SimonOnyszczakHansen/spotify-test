import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  artist: any = null

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.loadArtist('28Ty0gJoYvoIlJuaDNcJ2q')
  }

  loadArtist(artistId: string) {
    this.spotifyService.getArtist(artistId)
    .subscribe({
      next: artistObj => this.artist = artistObj
    })
  }
}