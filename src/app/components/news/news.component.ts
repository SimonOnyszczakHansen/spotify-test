import { CommonModule, NgForOf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

interface NewsItems {
  id: string,
  title: string,
  date: string,
  content: string,
  url: string,
  urlText: string,
}

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, NgForOf],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {
  news!: Observable<NewsItems[]>;

 constructor(private http: HttpClient) {}

 ngOnInit(): void {
   this.news = this.http.get<NewsItems[]>('/assets/news.json');
 }

 openUrl(url: string) {
  window.open(url, '_blank')
 }
}
