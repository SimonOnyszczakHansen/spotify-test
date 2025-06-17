import { Component, OnInit } from '@angular/core';
import { InViewDirective } from '../../directive/in-view.directive';
import { FooterComponent } from '../footer/footer.component';
import { SpotifyService } from '../../../services/spotify.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [InViewDirective, FooterComponent, NgIf],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  artist: any[] = [];
  imageUrl = '';
  artistId: string = '28Ty0gJoYvoIlJuaDNcJ2q';

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.loadArtist(this.artistId)
  }

  loadArtist(artistId: string) {
    this.spotifyService.getArtist(artistId)
      .subscribe({
        next: artistObj => {
          this.artist = artistObj;
          this.imageUrl = artistObj.images?.[0]?.url ?? '';
        }

      })
  }
}
