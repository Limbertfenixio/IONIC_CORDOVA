import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileChooserPage } from './file-chooser.page';

const routes: Routes = [
  {
    path: '',
    component: FileChooserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileChooserPageRoutingModule {}
