import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { switchMap, map, mergeMap, toArray } from 'rxjs/operators';
import { SpotifyService } from '../../../services/spotify.service';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from "../footer/footer.component";
import { forkJoin } from 'rxjs';
import { Observable } from 'rxjs';
import { Track } from './models/track.model';
import { TRACK_DESCRIPTION } from './data/track-description';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, FooterComponent],
  templateUrl: './music.component.html',
  styleUrl: './music.component.css'
})
export class MusicComponent implements OnInit {
  albums: any[] = [];
  tracks: Track[] = [];
  selectedTrack: Track | null = null;
  artistId: string = '28Ty0gJoYvoIlJuaDNcJ2q';


  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.loadTracks(this.artistId);
  }

  selectTrack(Track: Track) {
    this.selectedTrack = Track;
  }

  private formatDuration(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const paddedSec = seconds < 10 ? '0' + seconds : seconds.toString();
    return `${minutes}:${paddedSec}`;
  }

  loadTracks(artistId: string) {
    this.spotifyService.getArtistAlbums(artistId).pipe(
      map(albumsRes => albumsRes.items),
      switchMap((albumArray: any[]) => {
        this.albums = albumArray;

        const trackObservables: Observable<any>[] = albumArray.map(album => {
          return this.spotifyService.getAlbumTracks(album.id).pipe(
            map((tracksRes: any) => {
              return (tracksRes.items as any[]).map(track => ({
                id: track.id,
                name: track.name,
                albumId: album.id,
                albumName: album.name,
                albumImage: album.images[0]?.url || '',
                duration_ms: track.duration_ms
              }));
            })
          );
        });

        return forkJoin(trackObservables);
      }),

      map((tracksByAlbum: any[][]) => {
        return tracksByAlbum.reduce((all, oneAlbumTracks) => all.concat(oneAlbumTracks), [] as any[]);
      })
    )
      .subscribe(
        (flattened: any[]) => {
          this.tracks = flattened.map((t, idx) => ({
            ...t,
            listIndex: idx + 1,
            duration: this.formatDuration(t.duration_ms),
            description: TRACK_DESCRIPTION[t.id] || ''
          }));
        },
        err => {
          console.error('Error fetching albums or tracks:', err);
        }
      );
  }
}
