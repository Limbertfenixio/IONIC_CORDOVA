import { ImguploadService } from './../../services/imgupload.service';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-file-transfer',
  templateUrl: './file-transfer.page.html',
  styleUrls: ['./file-transfer.page.scss'],
})
export class FileTransferPage implements OnInit {
  foto: string;
  imgPath: any = null;
  constructor(private imgUpload: ImguploadService, private camera: Camera, private actionSheetCtrl: ActionSheetController, private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  /**
   * Función que se encarga de subir la imagen al servidor
   */
  upload(){
    this.imgUpload.uploadImg(this.imgPath, 'limbertfenixio@gmail.com');
  }

  /**
   * Función que se encarga de abrir el actionsheet para elegir entre la cámara o la galería
   */
  async presentActionSheet() {
    let actionSheet = await this.actionSheetCtrl.create({
      header: 'Seleccionar Imagen',
      buttons: [
        {
          text: 'Cargar desde la galeria',
          icon: 'image',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Usar Camera',
          icon: 'camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  /**
   * Función que se encarga de tomar una foto de la cámara o de la galería
   * @param sourceType Tipo de recurso a abrir cámara o galería
   */
  public takePicture(sourceType) {
    // Creamos las opciones de la cámara
    var options = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
 
    // Tomamos la foto o la galería y obtenemos el path de la imagen
    this.camera.getPicture(options).then((imagePath) => {
      this.imgPath = imagePath;
      this.foto = imagePath;
    }, (err) => {
      console.log('Error: ', err);
    });
  }
}
