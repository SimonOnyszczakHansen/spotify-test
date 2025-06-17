import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { switchMap, map, mergeMap, toArray } from 'rxjs/operators';
import { SpotifyService } from '../../../services/spotify.service';
import { FooterComponent } from "../footer/footer.component";
import { InViewDirective } from '../../directive/in-view.directive';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent, InViewDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  artist: any = null
  tracks: any[] = []
  albums: any[] = [];
  artistId: string = '28Ty0gJoYvoIlJuaDNcJ2q';

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.loadArtist(this.artistId)
    this.loadAlbums(this.artistId)
    this.getLatestRelease()
  }

  loadArtist(artistId: string) {
    this.spotifyService.getArtist(artistId)
      .subscribe({
        next: artistObj => this.artist = artistObj
      })
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

  getLatestRelease(): any | null {
    if (!this.albums || this.albums.length === 0) {
      return null
    }
    return this.albums.reduce((prev, curr) => {
      const prevDate = new Date(prev.release_date);
      const currDate = new Date(curr.release_date);
      return currDate > prevDate ? curr : prev;
    })
  }

  openSpotify(url: string) {
    window.open(url, '_blank')
  }
}