import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FileTransferPageRoutingModule } from './file-transfer-routing.module';

import { FileTransferPage } from './file-transfer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    FileTransferPageRoutingModule
  ],
  declarations: [FileTransferPage]
})
export class FileTransferPageModule {}
