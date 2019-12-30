import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(private diagnostic: Diagnostic) { }

  /**
   * Función que se encarga de observar el estado de la solicitud del permiso
   * @param name Nombre del permiso a solicitar
   */
  getPermission(name){
    switch(name){
      case 'CAMERA':
       this.diagnostic.getPermissionAuthorizationStatus(this.diagnostic.permission.CAMERA).then((status) => {
         this.grantPermission(status, name);
       })
      break;
      case 'READ_CALENDAR':
        this.diagnostic.getPermissionAuthorizationStatus(this.diagnostic.permission.READ_CALENDAR).then((status) => {
          this.grantPermission(status, name);
        })
      break;
      case 'WRITE_CALENDAR':
       this.diagnostic.getPermissionAuthorizationStatus(this.diagnostic.permission.WRITE_CALENDAR).then((status) => {
         this.grantPermission(status, name);
       })
      break;
      case 'READ_CONTACTS':
       this.diagnostic.getPermissionAuthorizationStatus(this.diagnostic.permission.READ_CONTACTS).then((status) => {
         this.grantPermission(status, name);
       })
      break;
    }
   }

   /**
    * Función que se encarga de verificar si la aplicación posee los permisos necesarios
    * @param name Nombre del permiso a evaluar 
    */
   checkPermission(name): boolean{
    switch(name){
      case 'CAMERA':
       this.diagnostic.isCameraAuthorized().then((authorized) => {
         return authorized;
       })
      break;
      case 'READ_CALENDAR':
        this.diagnostic.isCalendarAuthorized().then((authorized) => {
          return authorized;
        })
      break;
      case 'WRITE_CALENDAR':
        this.diagnostic.isCalendarAuthorized().then((authorized) => {
          return authorized;
        })
      break;
      case 'READ_CONTACTS':
        this.diagnostic.isContactsAuthorized().then((authorized) => {
          return authorized;
        })
      break;
    }
    return false;
   }
 
   /**
    * Función que se encarga de verificar el estado de la solicitud del permiso
    * @param status Estado de la solicitud de permiso
    * @param permission Nombre del permiso a evaluar
    */
   grantPermission(status, permission){
     if(status != this.diagnostic.permissionStatus.GRANTED){
      this.requestPermission(permission);
     }
     /*
      NOT_REQUESTED: La aplicación aún no ha solicitado acceso a este permiso, la aplicación puede solicitar el permiso y se le solicitara al usuario que acepte/rechaze
      GRANTED: El usuario tiene acceso a este permiso
      DENIED: El usuario ha denegado este permiso
      DENIED_ALWAYS: El usuario denego el acceso a este permiso y marco la casilla "Nunca preguntar de nuevo", la aplicación nunca puede pedir permiso nuevamente, La unica forma de evitar esto es instruir al usuario para que cambie manualmente el permiso
      DENIED_ONCE: El usuario ha denegado el acceso a este permiso, la aplicación puede solicitar el permiso nuevamente y se le solicitara nuevamente que acepte/rechaze
     */
     switch(status){
       case this.diagnostic.permissionStatus.NOT_REQUESTED:
       break;
       case this.diagnostic.permissionStatus.GRANTED:
       break;
       case this.diagnostic.permissionStatus.DENIED:
       break;
       case this.diagnostic.permissionStatus.DENIED_ALWAYS:
       break;
       case this.diagnostic.permissionStatus.DENIED_ONCE:
       break;
     }
   }
 
   /**
    * Función que se encarga de mostrar el cuadro de dialogo al usuario para que acepte/rechaze el permiso
    * @param permissionName Nombre del permiso a evaluar
    */
   requestPermission(permissionName){
     switch(permissionName){
       case 'CAMERA':
         this.diagnostic.requestRuntimePermission(this.diagnostic.permission.CAMERA).then((data) => {})
       break;
       case 'READ_CALENDAR':
         this.diagnostic.requestRuntimePermission(this.diagnostic.permission.READ_CALENDAR).then((data) => {})
       break;
       case 'WRITE_CALENDAR':
         this.diagnostic.requestRuntimePermission(this.diagnostic.permission.WRITE_CALENDAR).then((data) => {})
       break;
       case 'READ_CONTACTS':
         this.diagnostic.requestRuntimePermission(this.diagnostic.permission.READ_CONTACTS).then((data) => {})
       break;
       case 'WRITE_CONTACTS':
         this.diagnostic.requestRuntimePermission(this.diagnostic.permission.WRITE_CONTACTS).then((data) => {})
       break;
       case 'GET_ACCOUNTS':
         this.diagnostic.requestRuntimePermission(this.diagnostic.permission.GET_ACCOUNTS).then((data) => {})
       break;
     }
   }
}
