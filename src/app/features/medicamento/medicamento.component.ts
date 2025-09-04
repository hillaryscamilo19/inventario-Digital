import { Component } from '@angular/core';


@Component({
  selector: 'app-medicamento',
  imports: [],
  templateUrl: './medicamento.component.html',
  styleUrl: './medicamento.component.css'
})
export class MedicamentoComponent {
 colaboradores = [
    { label: 'María González', value: 1 },
    { label: 'Juan Pérez', value: 2 },
    { label: 'Carlos Rojas', value: 3 }
  ];

  areas = [
    { label: 'Farmacia', value: 'farmacia' },
    { label: 'Enfermería', value: 'enfermeria' },
    { label: 'Administración', value: 'administracion' }
  ];

  medicamentos = [
    { label: 'Paracetamol', value: 'paracetamol' },
    { label: 'Ibuprofeno', value: 'ibuprofeno' },
    { label: 'Amoxicilina', value: 'amoxicilina' }
  ];
value: any;

}
