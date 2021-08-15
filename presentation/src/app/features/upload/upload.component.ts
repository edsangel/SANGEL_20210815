import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { VideoStreamApiService } from '../../shared/service/video-stream-api.service';
import { CategoryService } from '../../shared/service/category.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  title: string = '';
  description: string = '';
  categories: any;
  category: any;
  fileName = '';
  url: any;
  file: File | undefined;

  // flags
  displayLoadingSpinner: boolean = true;
  displayVideoLoader: boolean = false;
  hasError: boolean = false;

  constructor(
    private router: Router,
    private api: VideoStreamApiService,
    private categoryService: CategoryService,
    private sanitizer: DomSanitizer) {
    setTimeout(() => this.displayLoadingSpinner = false, 1000);
    this.categories = this.categoryService.getCategories();
  }

  onFileSelected(event: any) {
    this.hasError = false;
    this.url = '';
    const file = event.target.files && event.target.files[0];

    if (file && this.isAllowed(file)) {
      this.file = file;
      this.displayVideoLoader = true;
      this.fileName = file.name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.url = event && event.target ? event.target.result : '';
        if (this.url) {
          setTimeout(() => this.displayVideoLoader = false, 1000);
        }
      }
    } else {
      this.displayVideoLoader = false;
      this.hasError = true;
    }
  }

  upload() {
    if (this.file) {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('category', this.category);
      formData.append('video', this.file);

      this.api.uploadVideo(formData).subscribe(
        (data: any) => this.router.navigateByUrl(`/watch/${data['file'].fileid}?uploadSuccess=true`),
        () => this.hasError = true
      );
    }
  }

  displayCategory() {
    return this.categoryService.translateCategories(this.category);
  }

  canSubmit() {
    return this.title && this.category && this.file && !this.hasError;
  }
  
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  private isAllowed(file: any) {
    return (file.type === 'video/mp4' || file.type === 'video/quicktime') && file.size <= (200 * 1024 * 1024);
  }
}
