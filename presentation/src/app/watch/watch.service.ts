import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WatchService {
  private service: any = {};
  private endpoint: string = `${environment.apiUrl}/video/`;

  constructor(private http: HttpClient) { }

  checkAvailability(id: any) {
    const requestUrl = `${this.endpoint}${id}`;

    if (!this.service[requestUrl]) {
      this.service[requestUrl] = this.http.get(requestUrl);
    }

    return this.service[requestUrl];
  }

  getVideo(id: string) {
    return `${this.endpoint}${id}/play`;
  }
}
