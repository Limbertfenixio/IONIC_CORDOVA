# IONIC_CORDOVA
Desarrollo de pruebas de plugins de cordova native con ionic v4
## Comenzando :rocket:
Este proyecto te ayudara a probar los plugins de cordova que se usan juntamente con ionic v4
### Pre-requisitos :pencil:
  1. Cordova 9.0.0
  2. Ionic 5.4.6
  3. Node 12.14.0
  4. Angular 8.3.21
  
```
npm install -g cordova
npm install -g ionic
npm install -g @angular/cli
```
## Pruebas
- [Cordova Plugin Android-Permissions](#cordova-plugin-android-permissions)
- [Cordova Plugin Barcode Scanner](#cordova-plugin-barcode-scanner)
- [Cordova Plugin Camera Preview](#cordova-plugin-camera-preview)
- [Cordova Plugin Camera](#cordova-plugin--camera)
- [Cordova Plugin Background-geolocation](#cordova-plugin-geolocation)
- [Cordova Plugin Diagnostic](#cordova-plugin-diagnostic)
- [Cordova Plugin Faceboook](#cordova-plugin-facebook)
- [Cordova Plugin Geolocation](#cordova-plugin-geolocation)
- [Cordova Plugin Native Geocoder](#cordova-plugin-native-geocoder)
- [Cordova Plugin Push](#cordova-plugin-push)
- [Cordova Plugin Sqlite](#cordova-plugin-sqlite)
- [Cordova Plugin Sqlite Porter](#cordova-plugin-sqlite-porter)
- [Cordova Plugin Google Maps](#cordova-plugin-google-maps)
- [Cordova Plugin File-Transfer](#cordova-plugin-file-transfer)

### Cordova Plugin Android-permissions
  Este plugin ayudara a manejar el nuevo mecanismo de comprobación de permisos en Android
  ### Instalación :wrench:
  Para evitar conflictos de configuración de variables evitar instalar desde la consola el plugin de cordova solamente  instalar los types
  ```
  ionic cordova plugin add cordova-plugin-android-permissions
  npm install @ionic-native/android-permissions
  ```
  Desde Android 6.0 existe un nuevo mecanismo de verificación de permisos en Android estos ahora se activan cuando el usuario esta usando la aplicación.
  ####
  Compatible con Android SDK >= 14.
  ####
  Incluir la libreria en los providers dentro del archivo app.module.ts
  ```
  import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
  ```
  Para mas detalles de la documentación del plugin visitar [cordova-plugin-android-permissions](https://github.com/NeoLSN/cordova-plugin-android-permissions)
  Para mas detalles de la referencia de permisos en Android visitar [Referencia de permisos en Android](https://developer.android.com/reference/android/Manifest.permission.html)
  
### Cordova Plugin barcode-scanner
  Este plugin nos permite hacer uso de la camara y poder escanera el codigo de barras o qr, nos retorna la data que contiene
  ### Instalación :wrench:
  Instalamos el plugin y las librerias para types
  ```
  ionic cordova plugin add phonegap-plugin-barcodescanner
  npm install @ionic-native/barcode-scanner
  ```
  Incluir la libreria en los providers dentro del archivo app.module.ts
  ```
  import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
  ```
  Para mas detalles de la documentación del plugin visitar [cordova-plugin-barcode-scanner](  https://github.com/phonegap/phonegap-plugin-barcodescanner)
  
### Cordova Plugin Camera-preview
  Este plugin aparte de que nos permite hacer uso de la camara nativa del telefono, tambien nos permite personalizar la camara con componentes HTML.
  ### Instalación :wrench:
  Instalamos el plugin y las librerias para types
  ```
  ionic cordova plugin add cordova-plugin-camera-preview
  npm install @ionic-native/camera-preview
  ```
  Incluir la libreria en los providers dentro del archivo app.module.ts
  ```
  import { CameraPreview } from '@ionic-native/camera-preview/ngx';
  ```
  Para mas detalles de la documentación del plugin visitar [cordova-plugin-camera-preview](  https://github.com/cordova-plugin-camera-preview/cordova-plugin-camera-preview)
  
### Cordova Plugin Camera
  Este plugin nos permite hacer uso de la camara nativa del telefono y hacer captura de fotos y videos
  ### Instalación :wrench:
  Instalamos el plugin y las librerias para types
  ```
  ionic cordova plugin add cordova-plugin-camera
  npm install @ionic-native/camera
  ```
  Incluir la libreria en los providers dentro del archivo app.module.ts
  ```
  import { Camera } from '@ionic-native/camera/ngx';
  ```
  Para mas detalles de la documentación del plugin visitar [cordova-plugin-camera]( https://github.com/apache/cordova-plugin-camera)
  
### Cordova Plugin Background-geolocation
  Con este plugin obtendremos la posición actual del usuario en primer y segundo plano que ahorran bateria
  ### Instalación :wrench:
  Para evitar conflictos de configuración de variables evitar instalar desde la consola el plugin de cordova solamente  instalar los types
  ```
  npm install @ ionic-native / background-geolocation
  ```
  El plugin nativo debemos agregarlo en el archivo config.xml con las siguientes variables
  Nota: para las versiones recientes de cordova para evitar conflictos con los iconos se debe cambiar a ic_launcher
  ```
  <plugin name="cordova-plugin-background-geolocation" spec="@mauron85/cordova-plugin-background-geolocation@~3.1.0">
        <variable name="GOOGLE_PLAY_SERVICES_VERSION" value="11+" />
        <variable name="ANDROID_SUPPORT_LIBRARY_VERSION" value="26+" />
        <variable name="ICON" value="@mipmap/ic_launcher" />
        <variable name="SMALL_ICON" value="@mipmap/ic_launcher" />
        <variable name="ALWAYS_USAGE_DESCRIPTION" value="App requires background tracking " />
        <variable name="MOTION_USAGE_DESCRIPTION" value="App requires motion detection" />
  </plugin>
  ```
  Nota: Si existiera un conflicto con 'com.google.android.gms.common.internal.zzbq' se debe incluir este codigo manualmente en el build.gradle de platforms/android/build.gradle 
  ```
  //start here repositores{
        configurations.all {
            resolutionStrategy.eachDependency { DependencyResolveDetails details ->
                def requested = details.requested
                if (requested.group == 'com.google.android.gms') {
                    details.useVersion '11.8.0'
                }
                if (requested.group == 'com.google.firebase') {
                    details.useVersion '11.8.0'
                }
            }
        }
  //end
  ```
  Incluir la libreria en los providers dentro del archivo app.module.ts
  ```
  import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';
  ```
  Para mas detalles de la documentación del plugin visitar [cordova-plugin-background-geolocation](https://github.com/mauron85/cordova-plugin-background-geolocation)
 ### Tracking Service en primer y segundo plando
 Para poder realizar un servicio de tracking en tiempo real se debe instalar el siguiente complemento
 ```
  npm install --save simplify-js
 ```
 
### Cordova Plugin Diagnostic
  Con este plugin podremos comprobar si las funciones nativas del dispositivo estan habilitadas o no como el gps, wi-fi, bluetooth, etc
  ### Instalación :wrench:
  Instalamos el plugin y las librerias para types
  ```
  ionic cordova plugin add cordova.plugins.diagnostic
  npm install @ionic-native/diagnostic
  ```
  Incluir la libreria en los providers dentro del archivo app.module.ts
  ```
  import { Diagnostic } from '@ionic-native/diagnostic/ngx';
  ```
  Para mas detalles de la documentación del plugin visitar [cordova-plugin-diagnostic](  https://github.com/dpa99c/cordova-diagnostic-plugin)
  
### Cordova Plugin Facebook
  Con este plugin tendremos acceso a la aplicación FB nativa que nos permitira integrar nuestra aplicación con esta red social
  ### Instalación :wrench:
  Para poder usar el complemento primero debemos crear una aplicación de Facebook dentro de la pagina web de [Facebook Develoopers](https://developers.facebook.com/apps)
  Recuperar el App ID y el App Name
  Configurar la plataforma android e ios con el id de la aplicación que se encuentra en el archivo config.xml
  Instalamos el plugin y las librerias para types
  ```
  ionic cordova plugin add cordova-plugin-facebook4 --variable APP_ID="123456789" --variable APP_NAME="myApplication"
  npm install @ ionic-native / facebook
  ```
  Para mas detalles de la documentación del plugin visitar [cordova-plugin-facebook](https://github.com/jeduan/cordova-plugin-facebook4)
  
### Cordova Plugin Geolocation
  Este plugin nos permite obtener las coordenadas de la ubicación actual del usuario, estas coordenadas se obtienen del gps del dispositivo o por las redes inalambricas
  ### Instalación :wrench:
  Instalamos el plugin y las librerias para types
  ```
  ionic cordova plugin add cordova-plugin-geolocation
  npm install @ionic-native/geolocation
  ```
  Incluir la libreria en los providers dentro del archivo app.module.ts
  ```
  import { Geolocation } from '@ionic-native/geolocation/ngx';
  ```
  Para mas detalles de la documentación del plugin visitar [cordova-plugin-geolocation](  https://github.com/apache/cordova-plugin-geolocation)
  
### Cordova Plugin Native Geocoder
  Este plugin nos permite geocodificar las coordenadas en una dirección fisica, y una dirección fisica en coordenadas.
  ### Instalación :wrench:
  Instalamos el plugin y las librerias para types
  ```
  ionic cordova plugin add cordova-plugin-nativegeocoder
  npm install @ionic-native/native-geocoder
  ```
  Incluir la libreria en los providers dentro del archivo app.module.ts
  ```
  import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx'
  ```
  Para mas detalles de la documentación del plugin visitar [cordova-plugin-native-geocoder]( https://github.com/sebastianbaar/cordova-plugin-nativegeocoder)
  
### Cordova Plugin Push
  Este plugin nos servira para registrar y recibir notificaciones
  ### Instalación :wrench:
  Instalamos el plugin y las librerias para types
  ```
  ionic cordova plugin add phonegap-plugin-push
  npm install @ionic-native/push
  ```
  Para poder utilizar el servicio de notificaciones debemos dar de alta un proyecto en firebase, obtener el archivo google-services.json y por ende el sender_id de la aplicación eso lo configuramos en el siguiente enlace [FCM-Firebase](https://console.firebase.google.com/.)
  Incluir la libreria en los providers dentro del archivo app.module.ts
  ```
  import { Push } from '@ionic-native/push/ngx';
  ```
  Para mas detalles de la documentación del plugin visitar [cordova-plugin-push]( https://github.com/phonegap/phonegap-plugin-push)
  
### Cordova Plugin Sqlite
  Con este plugin podremos acceder a las bases de datos sql dentro del dispositivo.
  ### Instalación :wrench:
  Instalamos el plugin y las librerias para types
  ```
  ionic cordova plugin add cordova-sqlite-storage
  npm install @ionic-native/sqlite
  ```
  Incluir la libreria en los providers dentro del archivo app.module.ts
  ```
  import { SQLite } from '@ionic-native/sqlite/ngx';
  ```
  Para mas detalles de la documentación del plugin visitar [cordova-plugin-sqlite-storage](  https://github.com/litehelpers/Cordova-sqlite-storage)

### Cordova Plugin Sqlite Porter
  Este plugin nos permite hacer uso de bases de datos, importar, exportar bases de datos que esten en formato sql o json.
  ### Instalación :wrench:
  Instalamos el plugin y las librerias para types
  ```
  ionic cordova plugin add uk.co.workingedge.cordova.plugin.sqliteporter
  npm install @ionic-native/sqlite-porter
  ```
  Incluir la libreria en los providers dentro del archivo app.module.ts
  ```
  import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
  ```
  Para mas detalles de la documentación del plugin visitar [cordova-plugin-sqlite-porter](  https://github.com/dpa99c/cordova-sqlite-porter)
  
### Cordova Plugin Google Maps
  Este plugin proporciona una manera facil de interactuar con las promesas y observables de angular lo que permite facilitar el uso de complementos de cambio de angular
  ### Instalación :wrench:
  Instalamos el plugin y las librerias para types
  ```
  ionic cordova plugin add cordova-plugin-googlemaps
  npm install @ionic-native/google-maps
  ```
  Establecer las variables de la apiKey dentro del archivo config.xml
  ```
  < widget ...>
    ...
    <preference name="GOOGLE_MAPS_ANDROID_API_KEY" value="(api key)" />
    <preference name="GOOGLE_MAPS_IOS_API_KEY" value="(api key)" />
    ...
  </ widget >
  ```
  Incluir la libreria en los providers dentro del archivo app.module.ts
  ```
  import { GoogleMaps } from '@ionic-native/google-maps/ngx';
  ```
  Para mas detalles de la documentación del plugin visitar [google-maps](https://github.com/ionic-team/ionic-native-google-maps/blob/master/documents/README.md)

### Cordova Plugin File-Transfer
  Este plugin se utiliza para enviar y recibir archivos desde un servidor a nuestro telefono movil de manera sencilla.
  ### Instalación :wrench:
  Instalamos el plugin y las librerias para types
  ```
  ionic cordova plugin add cordova-plugin-file-transfer
  npm install @ionic-native/file-transfer
  ```
  ####
  Incluir la libreria en los providers dentro del archivo app.module.ts
  ```
  import { FileTransfer} from '@ionic-native/file-transfer/ngx';
  ```
  Para mas detalles de la documentación del plugin visitar [cordova-plugin-android-permissions](https://github.com/apache/cordova-plugin-file-transfer)
