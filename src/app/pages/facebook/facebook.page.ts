import { Facebook } from '@ionic-native/facebook/ngx';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.page.html',
  styleUrls: ['./facebook.page.scss'],
})
export class FacebookPage implements OnInit {

  user: any = {};
  showUser: boolean = false;
  constructor(private facebook: Facebook) { }

  ngOnInit() {
  }

  /**
   * Función que se encarga de iniciar sesión en facebook
   */
  loginFacebook(){
    this.facebook.login(['public_profile', 'email']).then((res) => {
      console.log(res.status)
      if(res.status == 'connected'){
        this.getInfo();
      }
    }).catch(error => console.log(JSON.stringify(error)));
  }

  /**
   * Función que se encarga de obtener la información de usuario logueado
   */
  getInfo(){
    this.facebook.api('/me?fields=id,name,email,first_name,picture,last_name,gender', ['public_profile','email']).then((data) => {
      console.log(data);
      this.showUser = true;
      this.user = data;
    }).catch(error => console.log(JSON.stringify(error)));
  }
}
