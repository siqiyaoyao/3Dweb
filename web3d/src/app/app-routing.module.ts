import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {UploadComponent } from './pages/upload/upload.component';
import {ViewComponent } from './pages/view/view.component';
const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'upload',
    component:UploadComponent
  },
  {
    path:'view',
    component:ViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
