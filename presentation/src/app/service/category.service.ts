import { Injectable } from '@angular/core';
import { VideoStreamApiService } from './video-stream-api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private _categories: any[] = [];

  constructor(private api: VideoStreamApiService) {
    this.api.getCategories().subscribe((categories: any[]) => this._categories = categories);
  }

  getCategories(): any[] {
    return this._categories;
  }

  initializeCategories(categories: any[]) {
    this.api.initializeCategories(categories).subscribe();
  }

  translateCategories(id: any) {
    const category = this._categories.find((category: any) => category.id == id);

    return category ? category.name : '';
  }
}
