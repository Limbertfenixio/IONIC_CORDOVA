import { CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions } from '@ionic-native/camera-preview/ngx';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.page.html',
  styleUrls: ['./photo.page.scss'],
})
export class PhotoPage implements OnInit {

  constructor(private cameraPreview: CameraPreview, private location: Location) { }

  img: string;
  status: boolean = false; 
  //Opciones de configuración de la camara
  cameraOpts: CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: window.screen.width,
    height: window.screen.height,
    camera: 'rear',
    tapPhoto: true,
    previewDrag: true,
    toBack: true,
    alpha: 1,
  }

  //Opciones de Configuración de la imagen de captura
  cameraPictureOpts: CameraPreviewPictureOptions = {
    width: window.screen.width,
    height: window.screen.height,
    quality: 100
  }

  ngOnInit() {
    this.startCamera();
  }

  /**
   * Función que se encarga de iniciar la cámara con las opciones establecidas
   */
  startCamera(){
    this.cameraPreview.startCamera(this.cameraOpts).then((res) => {}, err => {console.log(JSON.stringify(err))})
  }

  /**
   * Función que se encarga de capturar la imagen y almacenarla en la variable img
   */
  takePicture(){
    this.cameraPreview.takePicture(this.cameraPictureOpts).then((res) => {
      this.img = `data:image/jpeg;base64,${res}`;
      this.cameraPreview.stopCamera();
      this.status = true;
    })
  }

  /**
   * Función que se encarga de cambiar la cámara frontal o trasera
   */
  swithCamera(){
    this.cameraPreview.switchCamera();
  }

  /**
   * Función que se encarga de guardar la imagen en el localStorage y lo muestra en la vista principal
   */
  savePhoto(){
    this.status = false;
    localStorage.setItem('img', this.img);
    this.location.back();
  }

  /**
   * Función que no guarda la captura y redirecciona a la anterior pagina
   */
  cancel(){
    this.status = false;
    this.location.back();
  }

}
