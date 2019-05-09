import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  private cliente: Cliente = new Cliente();
  private titulo = 'Crear Cliente';

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activateRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activateRoute.params.subscribe(params => {
      let id: any;
      id = params['id'];
      if (id) {
        this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente );
      }
    });
  }

  create(): void {
    this.clienteService.create(this.cliente)
    .subscribe(cliente => {
      this.router.navigate(['/clientes']);
      swal('Nuevo cliente', `Cliente ${cliente.nombre} creado con éxito`, 'success');
    }
    );
  }

  update(): void {
    this.clienteService.update(this.cliente)
    .subscribe(cliente => {
      this.router.navigate(['/clientes']);
      swal('Cliente Actualizado', `Cliente ${cliente.nombre} actualizado con éxito!`, 'success');
    });
  }

}
