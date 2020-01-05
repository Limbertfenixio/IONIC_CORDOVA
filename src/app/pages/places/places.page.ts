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
  location;
  marker = null;
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
    enableHighAccuaricy: true,
  }
  constructor(private geolocation: Geolocation, private zone: NgZone) {
    //objeto para el autocompletado
    this.googleAutcomplete = new google.maps.places.AutocompleteService();
    //vaciamos los items
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
      this.location = myLatLng;
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
      this.addMarker(myLatLng);
    }, err => console.log(err));
  }

  /**
   * Función que se encarga del autocompletado de sitios
   */
  /* updateSearch(){
    if(this.autocomplete.input == ''){
      this.autocompleteItems = [];
      return;
    }
    let options = {
      //bounds: this.location,
      types: ['(cities)'],
      componentRestrictions: {country: 'us'}
    }
    this.googleAutcomplete.getPlacePredictions({ input: this.autocomplete.input, options: options }, (predictions, status) =>{
      this.autocompleteItems = [];
      this.zone.run(() =>{
        predictions.forEach(element =>{
          this.autocompleteItems.push(element);
        });
      });
    });
  } */

  /**
   * Función que se encarga de fltrar los places según la entrada de usuario
   * @param event datos del evento cuando se lanza el ionInput
   */
  seachLocations(event){
    //Si la entrada de texto esta vacio limpiamos el array
    if(this.autocomplete.input == ''){
      this.autocompleteItems = [];
    }
    /*
      Opciones de busqueda
      query: una cadena de texto en la que buscar 
      fields: Tipos de datos para devolver
      locationBias: Coordenadas que definen el area en la cual buscar objeto LatLng
    */
    var request = {
      query: this.autocomplete.input,
      fields: ['name', 'geometry','icon','formatted_address'],
      //locationBias: {radius: 100, center: {lat: 37.402105, lng: -122.081974}}
    } 

    //obtenemos un objeto del servicio de places
    var servicePlace = new google.maps.places.PlacesService(this.map);
    //filtramos el servicio y este nos devuelve los resultados y el status
    servicePlace.findPlaceFromQuery(request, (results, status) => {
      if(status === google.maps.places.PlacesServiceStatus.OK){
        this.autocompleteItems = results;
      }
    });
  }

  /**
   * Función que se encarga de relocalizar el marcador en un nuevo sitio en el mapa
   * @param item objeto de tipo places que devuleve valores de un sitio a buscar
   */
  goLocation(item){
    this.placeid = item.place_id;
    //eliminamos el marcador anterior
    this.marker.setMap(null);
    //Agregamos el nuevo marcador en pantalla
    this.addMarker(item.geometry.location);
    //Redireccionamos a google maps de acuerdo al nuevo sitio filtrado
    //return window.location.href = 'https://www.google.com/maps/place/?q=place_id:'+ this.placeid;
  }

  /**
   * Función que se encarga de colocar un marcador en la posición actual del usuario
   * @param latLng objeto que contiene las coordenadas del usuario
   */
  addMarker(latLng){
    //Limpiamos los items
    this.autocomplete.input = '';
    this.autocompleteItems = [];
    this.marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      icon: 'assets/img/icon_marker.png',
      draggable: true,
      animation: google.maps.Animation.DROP,
      title: 'Mi Ubicación'
    })
    //Evento dragend que obtiene las coordenadas de la nueva posicion del marcador
    this.marker.addListener('dragend', (event) => {
      console.log(event.latLng.lat());
      console.log(event.latLng.lng());
    });
    //Centreamos el mapa y colocamos el marcador
    this.map.setCenter(latLng)
    this.marker.setMap(this.map)
  }
}
