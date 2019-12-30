import { PermissionsService } from './../../services/permissions.service';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camera-preview',
  templateUrl: './camera-preview.page.html',
  styleUrls: ['./camera-preview.page.scss'],
})
export class CameraPreviewPage implements OnInit {
  
  constructor(private cameraPreview: CameraPreview, private router: Router, private permissionService: PermissionsService) { }

  img: string = null;
  
  ngOnInit() {
  }

  /*
    Recuperamos la imagen del localstorage
  */
  ionViewDidEnter(){
    this.img = localStorage.getItem('img');
    localStorage.clear();
  } 

  /**
   * Función que se encarga de direccionar a la vista de la camara
   */
  startCamera(){
    //Si el usuario acepta el permiso de la camara redirigimos a la pagina de la foto
    if(this.permissionService.checkPermission('CAMERA')){
      this.router.navigate(['camera-preview/photo']);
    }else{
      this.permissionService.getPermission('CAMERA');
    }
  }
}
