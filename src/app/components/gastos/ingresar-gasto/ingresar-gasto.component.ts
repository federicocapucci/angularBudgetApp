import { Component, OnInit } from '@angular/core';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-ingresar-gasto',
  templateUrl: './ingresar-gasto.component.html',
  styleUrls: ['./ingresar-gasto.component.css']
})
export class IngresarGastoComponent implements OnInit {
  nombreGasto: string;
  cantidad: number;
  textoIncorrecto: string;
  formularioIncorrecto: boolean;

  constructor(private _presupuestoService: PresupuestoService) {
    this.nombreGasto = "";
    this.cantidad = 0;
    this.textoIncorrecto = "";
    this.formularioIncorrecto = false;
  }

  ngOnInit(): void {
  }
  agregarGasto() {
    
    if (this.cantidad > this._presupuestoService.restante) {
      this.formularioIncorrecto = true;
      this.textoIncorrecto = "Cantidad ingresada es mayor al restante";
      return;
    }

    if (this.nombreGasto == "" || this.cantidad <= 0) {
      this.formularioIncorrecto = true;
      this.textoIncorrecto = "Nombre de gasto o cantidad invalidos";
    } else {
      //creamos el objeto 

      const GASTO = {
        nombre: this.nombreGasto,
        cantidad: this.cantidad
      }

      //enviamos el objeto a los suscriptores via subject

      this._presupuestoService.controlarRestante(GASTO);

      //reseteamos formulario
      this.formularioIncorrecto = false;
      this.nombreGasto = "";
      this.cantidad = 0;

    }
  }

}
