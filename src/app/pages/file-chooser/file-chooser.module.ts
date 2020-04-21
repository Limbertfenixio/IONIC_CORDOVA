import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FileChooserPageRoutingModule } from './file-chooser-routing.module';

import { FileChooserPage } from './file-chooser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    FileChooserPageRoutingModule
  ],
  declarations: [FileChooserPage]
})
export class FileChooserPageModule {}
