import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CameraPreviewPage } from './camera-preview.page';

const routes: Routes = [
  {
    path: '',
    component: CameraPreviewPage
  },
  {
    path: 'photo',
    loadChildren: () => import('./photo/photo.module').then( m => m.PhotoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CameraPreviewPageRoutingModule {}
