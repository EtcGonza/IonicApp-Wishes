import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista-model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista:any;
  nombreItem = '';

  constructor(private DeseosService: DeseosService, private router: ActivatedRoute) {
    const listaId = this.router.snapshot.paramMap.get('listaId');
    this.lista = this.DeseosService.obtenerLista(listaId);
    console.log(this.lista);
   }

  ngOnInit() {
  }

  agregarItem (){
    if (this.nombreItem.length === 0){
      return;
    }

    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);
    console.log(this.lista.items);
    this.nombreItem = '';

    this.DeseosService.guardarStorage();
  }

  cambioCheck (item:ListaItem) { 
    // console.log(item);

    const pendientes = this.lista.items.filter( itemData => {
      return itemData.completado === false;
    }).length;

    console.log(pendientes);

    if (pendientes === 0) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }

    this.DeseosService.guardarStorage();

    console.log(this.DeseosService.listas);
  }

  borrar (position :number) {
    this.lista.items.splice(position, 1);
    this.DeseosService.guardarStorage();
  }

}
