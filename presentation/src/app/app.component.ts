import { Component } from '@angular/core';

import { CategoryService } from './shared/service/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private categoryService: CategoryService) {
    this.categoryService.initializeCategories(['Education', 'Excercise', 'Recipe']);
  }
}
