import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TraceroutePageRoutingModule } from './traceroute-routing.module';

import { TraceroutePage } from './traceroute.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TraceroutePageRoutingModule
  ],
  declarations: [TraceroutePage]
})
export class TraceroutePageModule {}
