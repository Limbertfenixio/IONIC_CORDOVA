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
  {
    path: 'barcode',
    loadChildren: () => import('./pages/barcode/barcode.module').then( m => m.BarcodePageModule)
  },
  {
    path: 'geolocation',
    loadChildren: () => import('./pages/geolocation/geolocation.module').then( m => m.GeolocationPageModule)
  },
  {
    path: 'geocoder',
    loadChildren: () => import('./pages/geocoder/geocoder.module').then( m => m.GeocoderPageModule)
  },
  {
    path: 'places',
    loadChildren: () => import('./pages/places/places.module').then( m => m.PlacesPageModule)
  },
  {
    path: 'traceroute',
    loadChildren: () => import('./pages/traceroute/traceroute.module').then( m => m.TraceroutePageModule)
  },
  {
    path: 'backgroundtracking',
    loadChildren: () => import('./pages/backgroundtracking/backgroundtracking.module').then( m => m.BackgroundtrackingPageModule)
  },
  {
    path: 'file-transfer',
    loadChildren: () => import('./pages/file-transfer/file-transfer.module').then( m => m.FileTransferPageModule)
  },
  {
    path: 'file-chooser',
    loadChildren: () => import('./pages/file-chooser/file-chooser.module').then( m => m.FileChooserPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
