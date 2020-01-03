import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
declare var google;

@Component({
  selector: 'app-geocoder',
  templateUrl: './geocoder.page.html',
  styleUrls: ['./geocoder.page.scss'],
})
export class GeocoderPage implements OnInit {
  @ViewChild('map', null) mapElement: ElementRef;
  map: any;
  address: string;
  direccion: string;
  forward: string;
  /*  
    Opciones de configuración de geolocaliación
    enableHighAccuaricy: Proporciona los mejores resultados posibles,
    timeout:: tiempo maximo(milisegundos) que permite pasar una llamada watchPosition o CurrentPosition si el success no se ejecuta en este tiempo se pasa un error
    maximumAge: acepte una posición en cache cuyo el tiempo no se mayor (milisegundos)
  */
  geoOptions = {
    maximumAge: 5000,
    timeout: 8000,
    enableHighAccuaricy: true
  }
  //Opciones de geocoder
  options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  constructor(private geolocation: Geolocation, private geocoder: NativeGeocoder) { }

  ngOnInit() {
    this.loadMap();
  }

  /**
   * Función que se encarga de cargar el mapa en pantalla
   */
  loadMap(){
    //WatchPosition obtiene la ubicación mas precisa posible haciendo uso de redes estable
    this.geolocation.watchPosition(this.geoOptions).subscribe((location) =>{
      //Recuperamos en forma de objeto las coordenadas actuales
      let myLatLng = {lat: location.coords.latitude, lng: location.coords.longitude};
      //Opciones de mapa
      let mapOptions = {
        center: myLatLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      //Creamos el mapa sobre el elemento div y le pasamos las opciones del mapa
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      //Cada vez que se dispare el evento click se mostrara la dirección actual en pantalla
      this.map.addListener('click', () =>{
        console.log("accuryci", this.map);
        this.getAddresFromCoords(this.map.center().lat(), this.map.center().lng())
      });
      this.addMarker(myLatLng);
    }, err => console.log(err));
  }

  /**
   * Función que se encarga de convertir las coordenadas en dirección fisica
   * @param latLng Latitud y longitud en coordenadas
   */
  getAddresFromCoords(lat, lng){
    this.geocoder.reverseGeocode(lat, lng, this.options).then((result: NativeGeocoderResult[]) => {
      this.address = '';
      let responseAddress = [];
      //Vaciamos todos los valores que nos devuelve el geocoder
      for(let [key, value] of Object.entries(result[0])){
        if(value.length > 0){
          responseAddress.push(value);
        }
      }
      //Invertimos el array
      responseAddress.reverse();
      //Vaciamos los resultados en el texto final
      for(let value of responseAddress){
        this.address += value + ", ";
      }
      this.address = this.address.slice(0, -2);
    }).catch(err => {
      this.address = "Address Not Available!";
      console.log(JSON.stringify(err))
    });
  }

  /**
   * Función que se encarga de obtener las coordenadas cuando se introduce una dirección fisica
   */
  getCoordinates(){
    this.geocoder.forwardGeocode(this.direccion, this.options).then(data => {
      //Establecemos en el texto la longitud y la latitud recuperada
      this.forward = 'latidud: ' + data[0].latitude + '\nlongitud: ' + data[0].longitude;
    }).catch(err => alert(JSON.stringify(err)));
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
