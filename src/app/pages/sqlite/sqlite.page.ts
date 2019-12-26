import { ProductService } from './../../services/product.service';
import { Observable } from 'rxjs';
import { Products } from './../../intefaces/products';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sqlite',
  templateUrl: './sqlite.page.html',
  styleUrls: ['./sqlite.page.scss'],
})
export class SqlitePage implements OnInit {
  products: Products[];
  productData: Products[];
  constructor(private productDB: ProductService, private alertCtrl: AlertController) { }

  ngOnInit() {
    //Nos suscribimos a los Observables de Subject para ir sondeando los cambios
    this.productDB.getDatabaseState().subscribe(ready => {
      if(ready){
        this.productDB.getProducts().subscribe(products => {
          this.products = products;
        });
      }
    });
  }

  /**
   * Función que consume el servicio para poder almacenar dato en la tabla
   * @param data data a ser enviado al servicio para el almacenamiento
   */
  addProduct(data){
    this.productDB.insertProducts(data).then(_ => {}).catch(e=> {console.log(JSON.stringify(e))});
  }

  /**
   * Función que consume el servicio para poder actualizar los datos en la tabla según el id
   * @param data data a ser enviado al servicio para el almacenamiento
   */
  updateProduct(data){
    this.productDB.updateProduct(data).then(_ => {}).catch(e=> {console.log(JSON.stringify(e))});
  }

  /**
   * Función que consume el servicio para poder eliminar los datos en la tabla según el id
   * @param id id del elemento que se enviara al servicio para eliminar el elemento de la tabla
   */
  deleteProduct(id){
    this.productDB.deleteProduct(id).then(_=>{}).catch(e => {console.log(JSON.stringify(e))});
  }

  /**
   * Función asíncrona para poder mostrar un formulario de adición
   */
  async alertAdd(){
    const alert = await this.alertCtrl.create({
      header: 'Adicionar nuevo Producto',
      inputs: [{
        type: 'text',
        label: 'Nombre del producto',
        placeholder: 'Nombre del producto',
        name: 'name'
      },{
        type: 'number',
        label: 'Stock del producto',
        placeholder: 'Stock del producto',
        name: 'stock'
      },{
        type: 'text',
        name: 'image',
        value: 'https://pbs.twimg.com/profile_images/953978653624455170/j91_AYfd_400x400.jpg',
        id: 'id'
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      },{
        text: 'Aceptar',
        handler: (data) => {
          this.addProduct(data);
        }
      }]
    });
    return await alert.present();
  }

  /**
   * Función que se encarga de mostrar el formulario de actualización
   * @param id id del elemento a inspeccionar
   */
  async alertUpdate(id){
    this.productDB.loadProductsId(id).then(async (data: any) => {
      console.log(data)
      const alert = await this.alertCtrl.create({
        header: 'Editar el Producto',
        inputs: [{
          type: 'text',
          label: 'Nombre del producto',
          placeholder: 'Nombre del producto',
          name: 'name',
          value: data.name
        },{
          type: 'number',
          label: 'Stock del producto',
          placeholder: 'Stock del producto',
          name: 'stock',
          value: data.stock
        },{
          type: 'text',
          name: 'id',
          value: data.id,
          id: 'id'
        },{
          type: 'text',
          name: 'image',
          value: 'https://pbs.twimg.com/profile_images/953978653624455170/j91_AYfd_400x400.jpg',
          id: 'id'
        }],
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'
        },{
          text: 'Aceptar',
          handler: (data) => {
            this.updateProduct(data);
          }
        }]
      });
      return await alert.present();
    });
  }

  /**
   * Función que se encarga de mostrar un mensaje de confirmación
   * @param id id del elemento a inspeccionar
   */
  async alertDelete(id){
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Producto',
      message: 'Esta seguro de eliminar el producto?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      },{
        text: 'Aceptar',
        handler: () => {
          this.deleteProduct(id);
        }
      }]
    });
    return await alert.present();
  }
}
