import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.page.html',
  styleUrls: ['./barcode.page.scss'],
})
export class BarcodePage implements OnInit {

  encodedData: string = '';
  encodeData: any;
  type: any;
  scanData: any = {};
  /*
    Opciones de configuración de la cámara para escanear datos qr o de código de barras
    showFlipCameraButton: Colocar el icono de la camara para front y back
    showTorchButton: Colocar el icono del flash
    prompt: Mensaje que establece el texto de la parte inferior de la camara
    orientation: Orientación de la camara landscape o portrait
    torchOn: Iniciar con el flash encendido
    formats: formato 'QR_CODE,PDF_417'
    resultDisplayDuration: duracion del resultado en pantalla
    preferFrontCamera: preferencia de orientacion de pantalla
  */
  barcodeOptions: BarcodeScannerOptions = {
    showTorchButton: true,
    showFlipCameraButton: true,
    prompt: 'Porfavor ponga el codigo en la zona de la camara',
    orientation: 'landscape',
  };
  constructor(private barcode: BarcodeScanner) { }

  ngOnInit() {
    this.type = this.barcode.Encode.TEXT_TYPE;
  }

  /**
   * Función que se encarga de escanear el código de barras o QR
   */
  scanCode(){
    this.barcode.scan(this.barcodeOptions).then((data) => {
      this.scanData = data;
    }).catch(error => console.log(JSON.stringify(error)));
  }

  /**
   * Función que se encarga de seleccionar el tipo de codificación 
   * @param event evento con el valor seleccionado del ion-select
   */
  typeEncoded(event){
    switch(event.detail.value){
      case 'text':
        this.type = this.barcode.Encode.TEXT_TYPE
      break;
      case 'email':
        this.type = this.barcode.Encode.EMAIL_TYPE
      break;
      case 'phone':
        this.type = this.barcode.Encode.PHONE_TYPE
      break;
      case 'sms':
        this.type = this.barcode.Encode.SMS_TYPE
      break;
    }
  }

  /**
   * Función que se encarga de codificar un texto a imagen QR
   */
  encodedText(){
    this.barcode.encode(this.type, this.encodeData).then((data) => {
      this.encodedData = data;
    }).catch(error => console.log(JSON.stringify(error)));
  }

}
