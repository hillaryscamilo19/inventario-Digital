import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-dashboard',
  imports: [CardModule, ButtonModule, TableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  products: any[] | undefined;
entregas = [
  { fecha: '15/06/2023', usuario: 'María González', articulo: 'Paracetamol' },
  { fecha: '15/06/2023', usuario: 'Juan Pérez', articulo: 'Uniforme Talla M' },
  { fecha: '14/06/2023', usuario: 'Carlos Rojas', articulo: 'Ibuprofeno' }
];

}
