import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './music.component.html',
  styleUrl: './music.component.css'
})
export class MusicComponent {
  albums: any[] = [];
  tracks: any[] = []; 

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.loadAlbums('28Ty0gJoYvoIlJuaDNcJ2q');
  }

  loadAlbums(artistId: string) {
    this.spotifyService.getArtistAlbums(artistId).pipe(
      switchMap((albumsResp: any) => {
        this.albums = albumsResp.items;
        console.log(this.albums)
        const calls = this.albums.map(album =>
          this.spotifyService.getAlbumTracks(album.id).pipe(
            map((resp: any) =>
              resp.items.map((track: any) => ({ ...track, album }))
            )
          )
        );

        return calls.length ? forkJoin(calls) : of([]);
      }),
      map((arrays: any[][]) => arrays.flat())
    )
      .subscribe({
        next: allTracks => this.tracks = allTracks,
        error: err => console.error('Error loading tracks', err)
      });
  }

  getTracksForAlbum(albumId: string): any[] {
    return this.tracks.filter(t => t.album.id === albumId);
  }
}
