import { ImguploadService } from './../../services/imgupload.service';
import { PermissionsService } from './../../services/permissions.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  foto: string;
  fotoBase64: string;
  name: string;
  base64up: string;
  
  constructor(private camera: Camera, private webView: WebView, private permissionService: PermissionsService, private uploadService: ImguploadService) { }

  ngOnInit() {
  } 

  cameraOptions(srcType, dstType){
    /*  
      sourceType: Establece la fuente de la imagen puede ser CAMER, PHOTOLIBRARY
      quality: Establece la calidad puede ser de 1-100
      destinationType: es el valor de retorno puede ser FILE_URI (ruta de archivo .jpg) o DATA_URI (base64)
      encodingType : el tipo de codificacion de archivo de imagen se devuelve en JPEG o PNG
      mediaType : se usa para obtener ALLMEDIA (imágenes o videos), IMAGEN o VIDEO
      cameraDirection: Establece la direccion de la camara BACK o FRONT
      allowEdit: Permite la edicion simple antes de la seleccion,
      targetWidth: Ancho de pixeles para escalar la imagen
      targetHeight: Alto de pixeledes para escalar la imagen
      saveToPhotoAlbum: Guarda la imagen en la galeria de fotos
    */
    const cameraOptions: CameraOptions = {
      destinationType: dstType,
      sourceType: srcType,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
      saveToPhotoAlbum: true,
      quality: 100,
      correctOrientation: true,
      cameraDirection: this.camera.Direction.BACK
    }
    return cameraOptions;
  }

  /*

  */
  getPhoto(){
    if(this.permissionService.checkPermission('CAMERA')){
      
    }else{
      this.permissionService.getPermission('CAMERA');
    }
    let srcType = this.camera.PictureSourceType.CAMERA;
    let dstType = this.camera.DestinationType.DATA_URL;
    let options = this.cameraOptions(srcType, dstType);
    /*
      getPicture(options).then(success, error): Toma una foto con la camara o recupera una foto de la galeria la imagen se pasa a la devolucion de llamada como codificacion en base64, string o URI, abre la camara predeterminada cuando sourceType es igual a PictureSourceType.CAMERA || PictureSourceType.PHOTOLIBRARY permite seleccionar una imagen existente 
    */
    this.camera.getPicture(options).then((imageData: any) => {
      this.base64up = imageData;
      this.foto = 'data:image/jpeg;base64,' + imageData;
      //this.foto = this.webView.convertFileSrc(imageData);
    }, err =>{
      console.log(JSON.stringify(err));
    });
    /*
      Elimina los archivos de imagen intermedios que se guardan de forma temporal solo es soportado en la plataforma IOS
    
    this.camera.cleanup().then(_ => {
      console.log('la camara se limpio con exito en Ios')
    });*/
  }

  searchPhoto(){
    let srcType = this.camera.PictureSourceType.PHOTOLIBRARY;
    let dstType = this.camera.DestinationType.DATA_URL;
    let options = this.cameraOptions(srcType, dstType);
    this.camera.getPicture(options).then((imageData) => {
      this.base64up = imageData;
      this.foto = 'data:image/jpeg;base64,' + imageData;
    }, err => console.log(JSON.stringify(err)));
  }

  sendPhotoBase64(){
    this.uploadService.uploadImgBase64({img: this.base64up, name: this.name});
  }

  getPhotoServerBase64(){
    this.uploadService.getIImgBase64(this.name).subscribe((data: any) => {
      this.fotoBase64 = data.image;   
    })
  }
}