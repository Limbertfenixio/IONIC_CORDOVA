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
  
  checkPermission(){
    this.push.hasPermission().then((res: any) => {
      if(res.isEnabled){

      }
    });
  }

  initializeNotifications(){
    this.checkPermission();
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

    this.pushObj = this.push.init(this.options);

    this.pushObj.on('notification').subscribe((notification: any) => alert('Notificación: ' + notification));

    this.pushObj.on('registration').subscribe((registration: any) => console.log('registration' + registration));

    this.pushObj.on('error').subscribe((error) => console.log('error: ' + error))
  } 

}
