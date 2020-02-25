import { Push, PushOptions, PushObject } from '@ionic-native/push/ngx';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-push',
  templateUrl: './push.page.html',
  styleUrls: ['./push.page.scss'],
})
export class PushPage implements OnInit {
  private options: PushOptions;
  private pushObj: PushObject;
  constructor(private push: Push) { 
    
  }

  ngOnInit() {
  }
  
  /**
   * Función que se encarga de validar los permisos
   */
  checkPermission(){
    this.push.hasPermission().then((res: any) => {
      if(res.isEnabled){

      }
    });
  }

  /**
   * Función que se encarga de iniciar las notificaciones push
   */
  initializeNotifications(){
    this.checkPermission();
    //Opciones de Configuración de la notificación para diferentes plataformas
    this.options = {
      android: {
        sound: true,
        forceShow: true,
        senderID: '632290133085'
      },
      ios: {},
      windows: {},
      browser: {}
    }

    //Iniciamos el push con las opciones establecidas
    this.pushObj = this.push.init(this.options);

    //Eventos de notificación Se emite cuando nos entra una nueva notificación y contiene la información que ha entrado con la notificación.
    this.pushObj.on('notification').subscribe((notification: any) => alert('Notificación: ' + notification));

    //Evento de registration Se emite si se ha registrado correctamente en el servidor de notificaciones y con él llega el token que tenemos que guardar. En este caso le hemos puesto registration. Aconsejo que miréis lo que viene dentro porque hay cosas interesantes.
    this.pushObj.on('registration').subscribe((registration: any) => console.log('registration' + registration));

    //Evento de error Se emite cuando ha sucedido un error y nos entra por parámetros una cadena con el error que se ha producido.
    this.pushObj.on('error').subscribe((error) => console.log('error: ' + error))
  } 

}
