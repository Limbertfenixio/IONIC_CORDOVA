import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var google;
@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage implements OnInit {
  @ViewChild('map', null) mapElement: ElementRef;
  map: any;
  address: string;
  /*  
    Opciones de configuración de geolocaliación
    enableHighAccuaricy: Proporciona los mejores resultados posibles,
    timeout:: tiempo maximo(milisegundos) que permite pasar una llamada watchPosition o CurrentPosition si el success no se ejecuta en este tiempo se pasa un error
    maximumAge: acepte una posición en cache cuyo el tiempo no se mayor (milisegundos)
  */
  geoOptions = {
    maximumAge: 3000,
    timeout: 5000,
    enableHighAccuaricy: true
  }
  constructor(private geolocation: Geolocation) { }

  ngOnInit() {
    this.loadMap();
  }

  /**
   * Función que se encarga de cargar el mapa en pantalla
   */
  loadMap(){
    //WatchPosition obtiene la ubicación mas precisa posible haciendo uso de redes estable
    /* this.geolocation.watchPosition(this.geoOptions).subscribe((location) =>{
      let latLng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      console.log(location)

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.map.addListener('tilesloaded', () =>{
        console.log("accuryci", this.map);
        
      });
      let myLatLng = {lat: location.coords.latitude, lng: location.coords.longitude};
      google.maps.event.addListenerOnce(this.map, 'idle', () =>{
        this.addMarker(myLatLng);
      });
    }, err => console.log(err)); */
    //getCurrentPosition obtiene la ubicación actual del usuario y lo devuelve en una promesa
    this.geolocation.getCurrentPosition().then((location) =>{
      //Obtenemos la longitud y latitud en cordenadas
      let latLng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
      //Opciones de visualización del mapa
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      //Mostramos el mapa dentro del elemento html div con las opciones de mapa 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.map.addListener('tilesloaded', () =>{
        console.log("accuryci", this.map);
        
      });
      //Obtenemos las coordenadas en formato LatLng
      let myLatLng = {lat: location.coords.latitude, lng: location.coords.longitude};
      google.maps.event.addListenerOnce(this.map, 'idle', () =>{
        this.addMarker(myLatLng);
      });
      
    }).catch(err => console.log(err));
  }

  /**
   * Función que se encarga de colocar un marcador en la posición actual del usuario
   * @param latLng objeto que contiene las coordenadas del usuario
   */
  addMarker(latLng){
    let marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: 'Mi Ubicación'
    })
  }

}
