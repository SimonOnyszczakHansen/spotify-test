import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, of, from } from 'rxjs';
import { switchMap, map, mergeMap, toArray } from 'rxjs/operators';
import { SpotifyService } from '../../services/spotify.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './music.component.html',
  styleUrl: './music.component.css'
})
export class MusicComponent implements OnInit {
  albums: any[] = [];
  tracks: any[] = [];

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.loadAlbums('28Ty0gJoYvoIlJuaDNcJ2q');
  }

  loadAlbums(artistId: string) {
    this.spotifyService.getArtistAlbums(artistId).pipe(
      switchMap((albumsResp: { items: any[] }) => {
        this.albums = albumsResp.items;
        return from(this.albums).pipe(
          mergeMap(
            album =>
              this.spotifyService.getAlbumTracks(album.id).pipe(
                map((resp: { items: any[] }) =>
                  resp.items.map((track: any) => ({ ...track, album }))
                )
              ),
            1
          ),
          toArray()
        );
      }),
      map((arrays: any[][]) => arrays.flat())
    ).subscribe({
      next: allTracks => {
        this.tracks = allTracks;
      },
      error: err => console.error(err)
    });
  }
  


  getTracksForAlbum(albumId: string): any[] {
    return this.tracks.filter(t => t.album.id === albumId);
  }
}
