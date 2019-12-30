import { PermissionsService } from './../../services/permissions.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.page.html',
  styleUrls: ['./permissions.page.scss'],
})
export class PermissionsPage implements OnInit {

  permissions: any = [];
  ok: boolean = false;
  constructor(private dataService: DataService, private permissionService: PermissionsService) { }

  ngOnInit() {
    this.permissions = this.dataService.getDataPermissions();
  }

  /**
   * Función que se encarga de habilitar el permiso
   * @param name Nombre del permiso a evaluar
   */
  checkPermission(name){
    this.permissionService.getPermission(name);
  }

}
