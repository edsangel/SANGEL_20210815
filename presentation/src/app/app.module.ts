import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WatchComponent } from './watch/watch.component';
import { DirectoryComponent } from './directory/directory.component';
import { HeaderComponent } from './header/header.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { UploadComponent } from './upload/upload.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WatchComponent,
    DirectoryComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
