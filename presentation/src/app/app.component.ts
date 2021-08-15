import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryService } from './service/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'video-stream';
  src = `${environment.apiUrl}/video/1`;

  constructor(private categoryService: CategoryService) {
    this.categoryService.initializeCategories(['Education', 'Excercise', 'Recipe']);
    this.categoryService.getCategories();
  }
}
