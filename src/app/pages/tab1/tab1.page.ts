import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from '../../models/lista-model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  constructor(public DeseosService:DeseosService,
    private router: Router,
    public alertController: AlertController) {}

  async agregarLista (){

    const alert = await this.alertController.create({
      header: 'Nueva Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Ir al super'
        }
      ],
      buttons: [
      {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('Cancelar');
      }
    },
    {
      text: 'Crear',
      handler: (data) => {
        if (data.titulo.length != 0){
        // El valor ingresado es valido, puedo crear la lista.
        const listaId = this.DeseosService.crearLista(data.titulo);

        this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
        
        } else {
          // El valor ingresado no es valido.
          return
        }
      }
    }
      ]
    });

    alert.present();

  }

}
