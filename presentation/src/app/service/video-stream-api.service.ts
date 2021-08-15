import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoStreamApiService {
  private service: any = {};

  constructor(private http: HttpClient) { }

  getVideos(): Observable<any> {
    const url = '/api/videos';
    if (!this.service[url]) {
      this.service[url] = this.http.get(url);
    }

    return this.service[url];
  }

  getVideo(id: string): Observable<any> {
    const url = `/api/video/${id}`;

    if (!this.service[url]) {
      this.service[url] = this.http.get(url);
    }

    return this.service[url];
  }

  playVideo(id: string): any {
    return `${environment.apiUrl}/video/${id}/play`;
  }

  uploadVideo(uploadFormData: FormData): Observable<any> {
    const url = '/api/upload';

    if (!this.service[url]) {
      this.service[url] = this.http.post(url, uploadFormData);
    }

    return this.service[url];
  }

  initializeCategories(categories: string[]): Observable<any> {
    const url = '/api/categories/';
    const key = 'POST: ' + url;

    if (!this.service[key]) {
      this.service[key] = this.http.post(url, categories).pipe(shareReplay(1));
    }

    return this.service[key];
  }

  getCategories(): Observable<any> {
    const url = '/api/categories/';
    const key = 'GET: ' + url;

    if (!this.service[key]) {
      this.service[key] = this.http.get(url);
    }

    return this.service[key];
  }
}
