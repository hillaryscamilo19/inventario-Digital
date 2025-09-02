import { Component } from '@angular/core';
import { SelectModule } from "primeng/select";

@Component({
  selector: 'app-medicamento',
  imports: [SelectModule],
  templateUrl: './medicamento.component.html',
  styleUrl: './medicamento.component.css'
})
export class MedicamentoComponent {
selectedCity: any;
cities: any[]|undefined;

}
