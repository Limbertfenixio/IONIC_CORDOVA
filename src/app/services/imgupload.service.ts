import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

@Injectable({
  providedIn: 'root'
})
export class ImguploadService {
  //Url del servidor
  apiURL = 'http://192.168.0.13:3000/';
  constructor(private transfer: FileTransfer, private http: HttpClient) { }

  /**
   * 
   * @param img Archivo a enviar al servidor
   * @param desc Descripción o parámetro que se enviara al servidor
   */
  uploadImg(img , desc){
    // Destino URL
    let url = this.apiURL + 'api/uploads';
 
    // Archivo a subir
    var targetPath = img;
 
    // Opciones de subida
    var options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: {'desc': desc}
    };
 
    // Creamos una referencia para subir
    const fileTransfer: FileTransferObject = this.transfer.create();
 
    // Usamos el filetransfer para subir la imagen al servidor
    return fileTransfer.upload(targetPath, url, options);
  }

  uploadImgBase64(img){
    return this.http.post(this.apiURL + "api/image", img).subscribe();
  }

  getIImgBase64(name){
    return this.http.get(this.apiURL + "api/getimage/" + name);
  }
}
