import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { CategoryService } from '../../shared/service/category.service';
import { VideoStreamApiService } from '../../shared/service/video-stream-api.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit, OnDestroy {
  hasError: any = false;
  videos: any = [];
  imgSrcJson: any = {};
  displayLoadingSpinner: boolean = true;

  private observable: Subscription;

  constructor(
    route: ActivatedRoute,
    private router: Router,
    private api: VideoStreamApiService,
    private categoryService: CategoryService,
    private sanitizer: DomSanitizer) {

    route.queryParamMap.subscribe(q => this.hasError = q.get('error'));
    this.observable = this.getVideos().subscribe(() => setTimeout(() => this.displayLoadingSpinner = false, 1000));
  }

  goto(id: any) {
    this.router.navigateByUrl(`/watch/${id}`);
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.observable.unsubscribe();
  }

  displayCategory(id: any) {
    return this.categoryService.translateCategories(id);
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  trimValue(value: string) {
    return value.substr(0, 40);
  }

  private getVideos(): Observable<any> {
    return this.api.getVideos().pipe(
      map((videos: any) => {
        videos.forEach((video: any) => {
          let jsonKey = '';
          (new Uint8Array(video.thumbnail.data)).forEach((byte: number) => {
            jsonKey += String.fromCharCode(byte);
          });
          this.imgSrcJson[video.id] = jsonKey;
        });
        this.videos = videos;
      })
    );
  }
}
