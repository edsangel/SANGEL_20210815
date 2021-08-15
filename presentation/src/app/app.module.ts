import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { WatchComponent } from './features/watch/watch.component';
import { DirectoryComponent } from './features/directory/directory.component';
import { HeaderComponent } from './shared/header/header.component';
import { UploadComponent } from './features/upload/upload.component';

import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
