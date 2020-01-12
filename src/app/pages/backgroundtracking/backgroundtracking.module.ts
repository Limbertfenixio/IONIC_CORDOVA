import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BackgroundtrackingPageRoutingModule } from './backgroundtracking-routing.module';

import { BackgroundtrackingPage } from './backgroundtracking.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    BackgroundtrackingPageRoutingModule
  ],
  declarations: [BackgroundtrackingPage]
})
export class BackgroundtrackingPageModule {}
