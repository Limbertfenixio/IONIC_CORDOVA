import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TraceroutePage } from './traceroute.page';

const routes: Routes = [
  {
    path: '',
    component: TraceroutePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TraceroutePageRoutingModule {}
