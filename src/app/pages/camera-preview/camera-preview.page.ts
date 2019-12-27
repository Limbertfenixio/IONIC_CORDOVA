import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-camera-preview',
  templateUrl: './camera-preview.page.html',
  styleUrls: ['./camera-preview.page.scss'],
})
export class CameraPreviewPage implements OnInit {
  
  constructor(private cameraPreview: CameraPreview) { }

  img: string;
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

  cameraPictureOpts: CameraPreviewPictureOptions = {
    width: window.innerWidth,
    height: window.innerHeight,
    quality: 100
  }

  ngOnInit() {
  }

  startCamera(){
    this.cameraPreview.startCamera(this.cameraOpts).then((res) => {}, err => {console.log(JSON.stringify(err))})
  }

  takePicture(){
    this.cameraPreview.takePicture(this.cameraPictureOpts).then((res) => {
      this.img = `data:image/jpeg;base64,${res}`;
      this.cameraPreview.stopCamera();
    })
  }

  swithCamera(){
    this.cameraPreview.switchCamera();
  }
}
