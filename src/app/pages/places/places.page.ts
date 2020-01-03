import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;
@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
})
export class PlacesPage implements OnInit {
  @ViewChild('map', null) mapElement: ElementRef;
  map: any;
  googleAutcomplete: any;
  location: any;
  autocomplete: {input: string};
  autocompleteItems: any[];
  placeid: any;
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
  constructor(private geolocation: Geolocation, private zone: NgZone) {
    this.googleAutcomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
   }

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
      });
      //this.addMarker(myLatLng);
    }, err => console.log(err));
  }

  updateSearch(){
    if(this.autocomplete.input == ''){
      this.autocompleteItems = [];
      return;
    }
    this.googleAutcomplete.getPlacePredictions({ input: this.autocomplete.input }, (predictions, status) =>{
      this.autocompleteItems = [];
      this.zone.run(() =>{
        predictions.forEach(element =>{
          this.autocompleteItems.push(element);
        });
      });
    });
  }

  goLocation(item){
    this.placeid = item.place.id;
    return window.location.href = 'https://www.google.com/maps/place/?q=place_id'+ this.placeid;
  }
}
