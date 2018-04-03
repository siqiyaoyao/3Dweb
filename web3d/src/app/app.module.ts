import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule,Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UploadComponent } from './pages/upload/upload.component';

import { CommonModule }     from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { ViewComponent } from './pages/view/view.component';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from './core/confirm/confirm.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    UploadComponent,
    ViewComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FileUploadModule,
    BootstrapModalModule.forRoot({container:document.body}),
    HttpClientModule,
  ],
  //Don't forget to add the component to entryComponents section
  entryComponents: [
    ConfirmComponent
  ],
  providers: [
    Title,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
