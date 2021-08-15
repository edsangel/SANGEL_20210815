import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoryService } from '../../shared/service/category.service';
import { VideoStreamApiService } from '../../shared/service/video-stream-api.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {
  videoSource: any = undefined;
  video: any = {};

  // flags
  displayLoadingSpinner: boolean = true;
  uploadSuccess: boolean = false;

  private id: any;

  constructor(
    route: ActivatedRoute,
    private router: Router,
    private api: VideoStreamApiService,
    private categoryService: CategoryService) {
    route.paramMap.subscribe(param => this.id = param.get('id'));
    route.queryParamMap.subscribe(param => this.uploadSuccess = Boolean(param.get('uploadSuccess')));
  }

  ngOnInit() {
    this.checkVideoAvailability();
    setTimeout(() => this.uploadSuccess = false, 3000);
  }

  displayCategory(id: any) {
    return this.categoryService.translateCategories(id);
  }

  private checkVideoAvailability() {
    this.api.getVideo(this.id).subscribe((video: any) => {
      this.video['title'] = video.metadata.file.title;
      this.video['description'] = video.metadata.file.description;
      this.video['category'] = video.metadata.file.category;
      setTimeout(() => {
        this.displayLoadingSpinner = false;
        this.videoSource = this.api.playVideo(this.id);
        console.log(this.videoSource);
      }, 1000);
    }, () => {
      this.router.navigateByUrl('/?error=true');
    });
  }
}
