import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;
@Component({
  selector: 'app-traceroute',
  templateUrl: './traceroute.page.html',
  styleUrls: ['./traceroute.page.scss'],
})
export class TraceroutePage implements OnInit {
  @ViewChild('map', null) mapElement: ElementRef;
  map: any;
  marker = null;
  marker1 = null;
  marker2 = null;
  directionService: any = null;
  directionRender: any = null;
  bounds: any;
  cantMarker = 1;
  origin = null;
  destination  = null;
  constructor(private geolocation: Geolocation) {
    //Creamos una referencia al servicio de direcciones de google maps
    this.directionService = new google.maps.DirectionsService();
    //Creamos una referencia al servicio de renderizado de direcciones y suprimimos sus marcadores por defecto
    this.directionRender = new google.maps.DirectionsRenderer({suppressMarkers: true});
    this.bounds = new google.maps.LatLngBounds();
   }

  ngOnInit() {
    this.loadMap();
  }

  /**
   * Función que se encarga de cargar el mapa en pantalla
   */
  loadMap(){
    this.geolocation.getCurrentPosition().then((location) =>{
      //Obtenemos la longitud y latitud en cordenadas
      let latLng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
      this.origin = latLng;
      //Opciones de visualización del mapa
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      //Mostramos el mapa dentro del elemento html div con las opciones de mapa 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.map.addListener('click', (event) =>{
        //Solo agregamos un marcador al hacer click
        this.cantMarker++;
        if(this.cantMarker<3){
          this.destination = event.latLng;
          this.addMarker(event.latLng, '2');
        } 
      });
      //Obtenemos las coordenadas en formato LatLng
      let myLatLng = {lat: location.coords.latitude, lng: location.coords.longitude};
      this.addMarker(myLatLng,'1'); 
      //Establecemos los limites para que el mapa se optimize
      this.bounds.extend(myLatLng);
      this.map.fitbounds(this.bounds);
    }).catch(err => console.log(err));
  }

  /**
   * Función que se encarga de trazar las rutas en el mapa
   */
  traceRoute(){
    //le indicamos al servicio donde va a trazar la ruta
    this.directionRender.setMap(this.map);
    //Iniciamos la solicitud al servicio de ruta pasandole las opciones y recibiendo la respuesta y el estado
    this.directionService.route({
      origin: this.origin,
      destination: this.destination,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status) =>{
      //Si la status es ok mostramos la ruta en el mapa
      if(status === google.maps.DirectionsStatus.OK){
        this.directionRender.setDirections(response);
      }
    });
  }

  /**
   * Función que se encarga de colocar un marcador en la posición actual del usuario
   * @param latLng objeto que contiene las coordenadas del usuario
   */
  addMarker(latLng, id){
    //Creamos 2 marcadores 
    if(id == '1'){
      this.marker1 = new google.maps.Marker({
        position: latLng,
        map: this.map,
        draggable: true,
        icon: 'assets/img/icon_marker.png',
        animation: google.maps.Animation.DROP,
      })
    }else{
      this.marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        draggable: true,
        icon: 'assets/img/icon_marker.png',
        animation: google.maps.Animation.DROP,
      })
    }
    //Cada vez que uno de los marcadores se arrastre se dispara el evento y se obtiene sus coordenadas actuales y tambien disparamos el evento traceroute para pintar los cambios
    this.marker1.addListener('dragend', (event) =>{
      this.origin = event.latLng;
      this.traceRoute();
    });
    this.marker.addListener('dragend', (event) =>{
      this.destination = event.latLng;
      this.traceRoute();
    });
  }
}
