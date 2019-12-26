import { HttpClient } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { Products } from './../intefaces/products';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject, SQLiteDatabaseConfig } from '@ionic-native/sqlite/ngx';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  db: SQLiteObject;
  dbReady: BehaviorSubject<boolean> = new BehaviorSubject(true);
  products = new BehaviorSubject([]);
  constructor(private sqlite: SQLite, private sqlitePorter: SQLitePorter,private plt: Platform, private http: HttpClient) { 
    // Opciones de Configuracion de la bd
    const sqlOpts: SQLiteDatabaseConfig = {
      name: 'products.db',
      location: 'default'
    }
    this.plt.ready().then(() => {
      //Cuando la plataforma se carga creamos la bd si ya existe la abrimos y asignamos el objeto Sql a la variable db, creamos la tabla y obtenemos todos los productos
      this.sqlite.create(sqlOpts).then((db: SQLiteObject) => {
        this.db = db;
        this.createTable();
        this.loadProducts();
      });
    });
   }

  /**
  * Función que se encarga de cargar una base de datos externo y ejecutar su script 
  */
  loadDatabasePorter(){
    //Hacemos una solicitud http y nos suscribimos para poder importar el archivo sql
    this.http.get('assets/db/productosS.sql', { responseType: 'text'}).subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.db, sql).then(_ => {
        this.loadProducts();
        this.dbReady.next(true);
      }).catch(e => console.log(JSON.stringify(e)));
    });
  }
  
  /**
  * Función que se encarga de crear la tabla en la base de datos con las columnas necesarias
  */
  createTable(){
    this.db.executeSql('CREATE TABLE IF NOT EXISTS productos('
                      + 'id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,'
                      + 'name VARCHAR(25) NOT NULL,'
                      + 'stock VARCHAR(25) NOT NULL,'
                      + 'image VARCHAR(50) NULL);').then(() => {
    }).catch(e => {
    console.log('Error:' + JSON.stringify(e));
    });
  }

  /**
   * Función que se encarga de controlar el estado de la base de datos a través de un observable
   */
  getDatabaseState(){
    return this.dbReady.asObservable();
  }

  /**
   * Función que se encarga de controlar el estado de los productos a través de un observable
   */
  getProducts(): Observable<Products[]>{
    return this.products.asObservable();
  }

  /**
   * Función que se encarga de realizar la consulta para obtener todos los datos de la tabla
   */
  loadProducts(){
    //Ejecutamos la consulta sql y si existe al menos un dato lo almacenamos en el array después pasamos el cambio al Subject a través de la funcion next()
    return this.db.executeSql('SELECT * FROM productos', []).then((data) => {
      let products: Products[] = [];
      if(data.rows.length > 0){
        for(let i=0; i < data.rows.length;i++){
          products.push({
            id: data.rows.item(i).id,
            name: data.rows.item(i).name,
            stock: data.rows.item(i).stock,
            image: data.rows.item(i).image
          });
        }
      }
      this.products.next(products);
    });
  }

  /**
   * Función que se encarga de obtener los datos de la tabla productos de acuerdo a un id
   */
  loadProductsId(id){
    return new Promise((resolve, reject) => {
      //Si la promesa es exitosa ejecutamos la consulta sql y almacenamos la data en un objeto
      if(resolve){
        this.db.executeSql('SELECT * FROM productos WHERE id=?', [id]).then((data) => {
          var product = {
            id: data.rows.item(0).id,
            name: data.rows.item(0).name,
            stock: data.rows.item(0).stock,
            image: data.rows.item(0).image
          }
          resolve(product);
        }).catch(e => {console.log(JSON.stringify(e))});
      }else{
        reject('Fallo');
      }
    }); 
  }

  /**
   * Función que se encarga de insertar nuevos elementos a la tabla con una consulta sql
   * @param products data a ser insertado en la tabla
   */
  insertProducts(products: Products){
    //Ejecutamos la consulta sql para poder insertar datos en la tabla pasandole los argumentos
    let data = [products.name, products.stock, products.image];
    return this.db.executeSql('INSERT INTO productos (name,stock,image) VALUES(?,?,?)', data).then((data) => {
      this.loadProducts();
    });
  }

  /**
   * Función que se encarga de actualizar elementos según el id en la tabla con una consulta sql
   * @param products data a ser insertado en la tabla
   */
  updateProduct(products: Products){
    //Ejecutamos la consulta sql para poder actualizar datos en la tabla pasandole los argumentos
    let data = [products.name, products.stock, products.image, products.id];
    return this.db.executeSql('UPDATE productos set name=?,stock=?,image=? WHERE id=?', data).then((data) => {
      this.loadProducts();
    });
  }

  /**
   * Función que se encarga de eliminar elementos según el id en la tabla con una consulta sql 
   * @param id id del elemento que se desea eliminar
   */
  deleteProduct(id){
    //Ejecutamos la consulta sql para poder eliminar el elemento de la tabla y recargamos el loadProduct
    return this.db.executeSql('DELETE FROM productos WHERE id=?', [id]).then((data) => {
      this.loadProducts();
    });
  }
}
