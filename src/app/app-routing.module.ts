import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'camera',
    loadChildren: () => import('./pages/camera/camera.module').then( m => m.CameraPageModule)
  },
  {
    path: 'sqlite',
    loadChildren: () => import('./pages/sqlite/sqlite.module').then( m => m.SqlitePageModule)
  },
  {
    path: 'camera-preview',
    loadChildren: () => import('./pages/camera-preview/camera-preview.module').then( m => m.CameraPreviewPageModule)
  },
  {
    path: 'push',
    loadChildren: () => import('./pages/push/push.module').then( m => m.PushPageModule)
  },
  {
    path: 'permissions',
    loadChildren: () => import('./pages/permissions/permissions.module').then( m => m.PermissionsPageModule)
  },
  {
    path: 'facebook',
    loadChildren: () => import('./pages/facebook/facebook.module').then( m => m.FacebookPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
