import { TrackingService } from './../../services/tracking.service';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse, BackgroundGeolocationEvents } from '@ionic-native/background-geolocation/ngx';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
declare var google;
declare var plugin;

@Component({
  selector: 'app-backgroundtracking',
  templateUrl: './backgroundtracking.page.html',
  styleUrls: ['./backgroundtracking.page.scss'],
})
export class BackgroundtrackingPage implements OnInit {
  @ViewChild('map', null) mapElement: ElementRef;
  map: any;
  marker = null;
  location: Geoposition = null;
  myLatLng: string[] = [];
  prevPos: Geoposition;
  constructor(private geolocation: Geolocation, private backgroundGeolocation: BackgroundGeolocation, private tracking: TrackingService) { }

  ngOnInit() {
    this.loadMap();
    
    this.tracking.actualPos.subscribe(pos => {
      if(pos != null){
        this.drawRoute(pos);
      } 
    });
  }

  /**
   * Función que se encarga de cargar el mapa en pantalla
   */
  loadMap(){
    let mapOptions = {
      center: {lat: -16.5582992,lng:-68.2113555},
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoom: 15
    };
    //Mostramos el mapa dentro del elemento html div con las opciones de mapa 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  /**
   * Función que se encarga de trazar una polilinea por las rutas del tracking
   * @param pos parametro de tipo Geoposition que contiene datos de la ubicación actual
   */
  drawRoute(pos: Geoposition){
    //Si la posición anterior es null toma el valor de la primera posición
    if(this.prevPos == null){
      this.prevPos = pos;
    }
    let myLatLng = {lat: pos.coords.latitude, lng: pos.coords.longitude};
    if(this.marker != null){
      //eliminamos el marcador anterior
      this.marker.setMap(null);
    }
    this.addMarker(myLatLng)
    //Agregamos una polylinea para ir trazando la ruta del tracking
    let polyline = new google.maps.Polyline({
      path: [new google.maps.LatLng(this.prevPos.coords.latitude, this.prevPos.coords.longitude), new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude)],
      map: this.map,
      strokeColor: '#009690',
      strokeWeight: 3,
      strokeOpacity: 0.8,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
    })
    this.prevPos = pos;
  }

  /**
   * Función que se encarga de evaluar si la detección de posición esta habilitada y si no lo esta nos habré automáticamente la opción para habilitarla
   */
  startGeolocation(){
    this.backgroundGeolocation.checkStatus().then(rta => {
      if(rta){
        this.startBackgroundGeolocation();
      }else{
        this.backgroundGeolocation.showLocationSettings();
      }
    });
  }

  /**
   * Función que se encarga de iniciar la tarea de geolocalización en segundo plano
   */
  startBackgroundGeolocation(){
    /* 
      Configuraciones de geolocalización en segundo plano
      desiredAccuracy: Es valor posible de [0, 10, 100, 1000] entre más bajo la precisión en metros obtenida por el plugin será mejor.
      stationaryRadius: Es un valor en un radio en metros donde el plugin se activará o enviara una respuesta.
      distanceFilter: Es un valor en la distancia (horizontales) en metros donde el plugin se activará o enviara una respuesta.
      debug: Esta opción permite tener más información acerca de la respuesta y agrega un sonido cada vez que detecta un nuevo registro.
      stopOnTerminate: Si está en true la tarea de background-geolocation se detendrá si la aplicación es cerrada o sacada de segundo plano. Recordemos que el plugin funciona en modo background y foreground.
      locationProvider: Es la técnica usada para detectar los cambios de posición la técnica que usaremos será ACTIVITY_PROVIDER = 1, puedes ver qué provider escoger aquí: PROVIDERS
      startForeground: Habilita la detección de cambio de posición cuando la app está en segundo plano.
      interval: Será el mínimo de tiempo que el plugin estará solicitando la posición al dispositivo. Debemos tener en cuenta que los valores de tiempo van condicionados con los de distancia. Es decir si el dispositivo no detecta el movimiento x metros en x tiempo no solicitá la posición.
    */
    const config : BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 1,
      distanceFilter: 1,
      debug: false,
      stopOnTerminate: false,
      // Android only section
      locationProvider: 1,
      startForeground: true,
      interval: 3000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
      notificationTitle: 'Tracking',
      notificationText: 'Obteniendo Ubicacion en primer y segundo plano',
    };

    //Evento que va actualizando la posición del usuario
    this.backgroundGeolocation.configure(config).then(() => {
      //actualizamos la posición en primer plano
      this.backgroundGeolocation.on(BackgroundGeolocationEvents.foreground).subscribe(() =>{});
      //actualizamos la posición en segundo plano
      this.backgroundGeolocation.on(BackgroundGeolocationEvents.background).subscribe(() =>{});
      //actualizamos la posición cada vez que obtenemos el locatión
      this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) =>{
        this.setLocations(location);
      });
    });
    this.backgroundGeolocation.start();
  }

  /**
   * Función que se encarga de establecer la ubicación actual e ir activado el tracking
   * @param location Parametro de tipo BackgroundGeolocationResponse que contiene datos de la ubicación actual
   */
  setLocations(location: BackgroundGeolocationResponse){
    this.location = {
      coords: {
        latitude: location.latitude,
        longitude: location.longitude,
        accuracy: location.accuracy,
        altitude: location.altitude,
        speed: location.speed,
        heading: null,
        altitudeAccuracy: null
      },
      timestamp: location.time
    };
   
    this.tracking.setPosBack(this.location);
    this.tracking.startTracking();
  }

  /**
   * Función que se encarga de detener el background location en segundo plano
   */
  stopBackgroundGeolocation(){
    this.backgroundGeolocation.stop();
  }

  /**
   * Función que se encarga de colocar un marcador en la posición actual del usuario
   * @param latLng objeto que contiene las coordenadas del usuario
   */
  addMarker(latLng){
    let icon = new google.maps.MarkerImage(
      '/assets/svg/mylocation.svg',
      null,
      null,
      null,
      new google.maps.Size(20, 20)
    ) 
    this.marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      icon: icon,
    });
    //Centreamos el mapa y colocamos el marcador
    this.map.setCenter(latLng)
    this.marker.setMap(this.map)
  }
}
