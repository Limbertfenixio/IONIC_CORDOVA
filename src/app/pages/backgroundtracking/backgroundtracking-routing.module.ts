import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BackgroundtrackingPage } from './backgroundtracking.page';

const routes: Routes = [
  {
    path: '',
    component: BackgroundtrackingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackgroundtrackingPageRoutingModule {}
