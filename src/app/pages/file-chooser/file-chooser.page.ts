import { Base64 } from '@ionic-native/base64/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ImguploadService } from './../../services/imgupload.service';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-chooser',
  templateUrl: './file-chooser.page.html',
  styleUrls: ['./file-chooser.page.scss'],
})
export class FileChooserPage implements OnInit {
  fileUri: any;
  img: any;

  constructor(private fileChooser: FileChooser, private uploadService: ImguploadService, private filePath: FilePath, private base64: Base64) { }

  ngOnInit() {
  }

  openImage(){
    this.fileChooser.open({mime: 'image/*'}).then((uri) => {
      this.fileUri = uri;
      alert(uri)
    }, (err) => alert(err))
  }

  openVideo(){
    this.fileChooser.open({mime: 'video/*'}).then((uri) => {
      this.fileUri = uri;
      alert(uri)
    }, (err) => alert(err))
  }

  openMusic(){
    this.fileChooser.open({mime: 'audio/*'}).then((uri) => {
      this.fileUri = uri;
      alert(uri)
    }, (err) => alert(err))
  }

  openDocument(){
    this.fileChooser.open({mime: 'application/*'}).then((uri) => {
      this.fileUri = uri;
      alert(uri)
    }, (err) => alert(err))
  }

  openAll(){
    this.fileChooser.open().then((uri) => {
      this.fileUri = uri;
      alert(uri)
    }, (err) => alert(err))
  }

  uploadImage(){
    this.filePath.resolveNativePath(this.fileUri).then((nativePath) => {
      this.base64.encodeFile(nativePath).then((base64string) => {
        var dataBase64 = base64string.split('base64,')[1];
        this.img = 'data:image/jpeg;base64,' + dataBase64;
        this.uploadService.uploadImgBase64({img: dataBase64,name: Math.random().toString()});
      }, err => alert(err))
    }, err => alert(err));
  }
}
