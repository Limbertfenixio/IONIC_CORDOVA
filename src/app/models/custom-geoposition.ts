import { Geoposition } from '@ionic-native/geolocation/ngx';

export class CustomGeoposition implements Geoposition {
    //Interfaz de Geoposition
    public coords: Coordinates;
    public timestamp: number;
    //Coordenadas de puntos para la libreira simplify.js
    public x;
    public y;

    constructor(geoposition: Geoposition){
        this.coords = geoposition.coords;
        this.timestamp = geoposition.timestamp;
        this.x = geoposition.coords.latitude;
        this.y = geoposition.coords.longitude;
    }
}
