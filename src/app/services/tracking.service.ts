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

  /**
   * Función que se encarga de suscribirse al servicio de posicionamiento, que va recogiendo las posiciones que este emite y las va almacenando en una pila
   */
  startTracking(){
    //Si la cordenada actual es diferente de null
    if(this.actualPosBack.coords != null){
      //Agregamos a la pila la posición actual
        this.positionArray.push(new CustomGeoposition(this.actualPosBack));
        //si el tamaño de la pila ya tiene al menos 2 ubicaciones la posición anterior sera igual a la primera posición
        if(this.positionArray.length > this.positionPila){
          if(this.prevPosition == null){
            this.prevPosition = this.positionArray[0];
          }
          //Insertamos la posición anterior al inicio de la pila
          this.positionArray.unshift(this.prevPosition);
         //Simplificamos los puntos almacenados y lo emitimos para todo el que este suscrito 
          let filteredPoints = simplify(this.positionArray, 15, true);
          this.positionArray = [];
          filteredPoints.unshift(this.prevPosition);
          this.parseFileredPoints(filteredPoints);
        }
    }
  }

  /**
   * Función que se encarga de tratar y filtrar las posiciones actuales para el tracking
   * @param filteredPoints Parametro de tipo CustomGeopositión que se usa para filtrar posiciones
   */
  parseFileredPoints(filteredPoints: CustomGeoposition[]){
    filteredPoints.forEach(point => {
      this._actualPos.next(point);
      this.prevPosition = point;
    });
  }

  /**
   * Función que se encarga de establecer la posición actual para el tracking
   * @param actualPosBack Parametro de tipo Geoposition que contiene los valores de la posición actual
   */
  setPosBack(actualPosBack: Geoposition){
    this.actualPosBack = actualPosBack;
  }
}
