import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeocoderPageRoutingModule } from './geocoder-routing.module';

import { GeocoderPage } from './geocoder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    GeocoderPageRoutingModule
  ],
  declarations: [GeocoderPage]
})
export class GeocoderPageModule {}
