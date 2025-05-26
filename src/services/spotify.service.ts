import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class SpotifyService {
  private apiUrl = 'https://api.spotify.com/v1';
  private appToken: string | null = null;

  constructor(private http: HttpClient) { }

  private fetchAppToken(): Observable<string> {
    if (this.appToken) {
      return of(this.appToken);
    }
    return this.http
      .get<{ access_token: string }>('http://localhost:3000/api/spotify-token')
      .pipe(
        map(res => res.access_token),
        tap(t => (this.appToken = t))
      );
  }

  private withAuthHeaders<T>(
    fn: (headers: HttpHeaders) => Observable<T>
  ): Observable<T> {
    return this.fetchAppToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return fn(headers);
      })
    );
  }

  getArtistAlbums(artistId: string): Observable<any> {
    return this.withAuthHeaders(headers =>
      this.http.get(
        `${this.apiUrl}/artists/${artistId}/albums`,
        { headers, params: { market: 'DK', limit: 50, include_groups: 'album,single' } }
      )
    );
  }

  getAlbumTracks(albumId: string): Observable<any> {
    return this.withAuthHeaders(headers =>
      this.http.get(
        `${this.apiUrl}/albums/${albumId}/tracks`,
        { headers, params: { market: 'DK', limit: 50 } }
      )
    );
  }

  getArtist(artistId: string): Observable<any> {
    return this.withAuthHeaders(headers =>
      this.http.get(`${this.apiUrl}/artists/${artistId}`, { headers })
    )
  }
}
