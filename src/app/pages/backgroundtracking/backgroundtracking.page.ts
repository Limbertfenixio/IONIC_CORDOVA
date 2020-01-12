import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse, BackgroundGeolocationEvents } from '@ionic-native/background-geolocation/ngx';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;

@Component({
  selector: 'app-backgroundtracking',
  templateUrl: './backgroundtracking.page.html',
  styleUrls: ['./backgroundtracking.page.scss'],
})
export class BackgroundtrackingPage implements OnInit {
  @ViewChild('map', null) mapElement: ElementRef;
  map: any;
  myLatLng: string[] = [];
  constructor(private geolocation: Geolocation, private backgroundGeolocation: BackgroundGeolocation) { }

  ngOnInit() {
    this.loadMap();
  }

  /**
   * Función que se encarga de cargar el mapa en pantalla
   */
  loadMap(){
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
        //this.addMarker(myLatLng);
      });
      
    }).catch(err => console.log(err));
  }

  /**
   * Función que se encarga de evaluar si la detección de posición esta habilitada y si no lo esta nos habré automáticamente la opción para habilitarla
   */
  startGeolocation(){
    this.backgroundGeolocation.isLocationEnabled().then(rta => {
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
      debug: true,
      stopOnTerminate: false,
      //Solo para Android
      locationProvider: 1,
      startForeground: true,
      interval: 4000,
      fastestInterval: 5000,
      activitiesInterval: 4000
    };

    //Evento que va actualizando la posición del usuario
    this.backgroundGeolocation.configure(config).then(() => {
      this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) =>{
        this.myLatLng.push(`${location.latitude},${location.longitude}`);
        alert('latitud: ' + location.latitude + 'longtud: ' +location.longitude)
      });
    });

    this.backgroundGeolocation.start();
  }

  /**
   * Función que se encarga de detener el background location en segundo plano
   */
  stopBackgroundGeolocation(){
    this.backgroundGeolocation.stop();
  }
}
