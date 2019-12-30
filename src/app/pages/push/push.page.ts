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

    //Eventos de subscripción de los push
    this.pushObj.on('notification').subscribe((notification: any) => alert('Notificación: ' + notification));

    this.pushObj.on('registration').subscribe((registration: any) => console.log('registration' + registration));

    this.pushObj.on('error').subscribe((error) => console.log('error: ' + error))
  } 

}
