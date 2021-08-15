import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DirectoryComponent } from './directory/directory.component';
import { UploadComponent } from './upload/upload.component';
import { WatchComponent } from './watch/watch.component';

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
