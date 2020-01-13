import { Geoposition, Geolocation } from '@ionic-native/geolocation/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomGeoposition } from './../models/custom-geoposition';
import { Injectable } from '@angular/core';
import * as simplify from 'simplify-js';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  minPrec: number = 25;
  positionPila: number = 2;
  positionArray: CustomGeoposition[] = [];
  prevPosition: CustomGeoposition = null;
  _actualPos: BehaviorSubject<Geoposition> = new BehaviorSubject<Geoposition>(null);
  actualPos: Observable<Geoposition> = this._actualPos.asObservable();

  actualPosBack: Geoposition = null;

  constructor() { }

  startTracking(){
    console.log('entre');
    if(this.actualPosBack.coords != null){
        this.positionArray.push(new CustomGeoposition(this.actualPosBack));
        if(this.positionArray.length > this.positionPila){
          if(this.prevPosition == null){
            this.prevPosition = this.positionArray[0];
          }
          this.positionArray.unshift(this.prevPosition);
          let filteredPoints = simplify(this.positionArray, 15, true);
          this.positionArray = [];
          filteredPoints.unshift(this.prevPosition);
          this.parseFileredPoints(filteredPoints);
        }
      if(this.actualPosBack.coords.speed > 0 && this.actualPosBack.coords.accuracy < this.minPrec){
        
      }
    }
  }

  parseFileredPoints(filteredPoints: CustomGeoposition[]){
    filteredPoints.forEach(point => {
      this._actualPos.next(point);
      this.prevPosition = point;
    });
  }

  setPosBack(actualPosBack: Geoposition){
    this.actualPosBack = actualPosBack;
    console.log('lim'+actualPosBack.coords.latitude + 'sd' + actualPosBack.coords.longitude)
  }
}
