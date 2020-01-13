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
- [Cordova Plugin Android-Permissions](#cordova-plugin-background-android-permissions)
- [Cordova Plugin Barcode Scanner](#cordova-plugin-background-barcode-scanner)
- [Cordova Plugin Camera Preview](#cordova-plugin-background-camera-preview)
- [Cordova Plugin Camera](#cordova-plugin-background-camera)
- [Cordova Plugin Background-geolocation](#cordova-plugin-background-geolocation)
- [Cordova Plugin Diagnostic](#cordova-plugin-diagnostic)
- [Cordova Plugin Faceboook](#cordova-plugin-facebook)
- [Cordova Plugin Geolocation](#cordova-plugin-geolocation)
- [Cordova Plugin Native Geocoder](#cordova-plugin-native-geocoder)
- [Cordova Plugin Push](#cordova-plugin-push)
- [Cordova Plugin Push](#cordova-plugin-sqlite)
- [Cordova Plugin Push](#cordova-plugin-sqlite-porter)

### Cordova Plugin Android-permissions
### Cordova Plugin Background-barcode-scanner
### Cordova Plugin Background-camera-preview
### Cordova Plugin Background-camera
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
  //start here
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
  Para mas detalles de la documentación del plugin visitar [cordova-plugin-background-geolocation](https://github.com/mauron85/cordova-plugin-background-geolocation)
 ### Tracking Service en primer y segundo plando
 Para poder realizar un servicio de tracking en tiempo real se debe instalar el siguiente complemento
 ```
  npm install --save simplify-js
 ```
### Cordova Plugin Diagnostic
### Cordova Plugin Facebook
### Cordova Plugin Geolocation
### Cordova Plugin Native Geocoder
### Cordova Plugin Push
### Cordova Plugin Sqlite
### Cordova Plugin Sqlite Porter
