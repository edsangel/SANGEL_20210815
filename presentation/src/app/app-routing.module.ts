import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DirectoryComponent } from './features/directory/directory.component';
import { UploadComponent } from './features/upload/upload.component';
import { WatchComponent } from './features/watch/watch.component';

const routes: Routes = [
  {
    path: '',
    component: DirectoryComponent
  },
  {
    path: 'watch/:id',
    component: WatchComponent
  },
  {
    path: 'upload',
    component: UploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
