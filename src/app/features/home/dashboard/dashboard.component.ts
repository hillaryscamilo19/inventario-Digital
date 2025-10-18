import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Medicamento,
  Empleados,
  Entrega,
  MedicamentoService,
  RegistroEntrega,
} from '../../../services/medicamento.service';
import { Uniforme, UniformeService } from '../../../services/uniforme.service';
import { FilterStockBajoPipe } from '../../../core/interceptors/filter-stock-bajo.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FilterStockBajoPipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'], // 👈 corregido (era styleUrl)
})
export class DashboardComponent implements OnInit {
  medicamentos: Medicamento[] = [];
  empleados: Empleados[] = [];
  entrega: RegistroEntrega[] = [];
  entregasHoy: RegistroEntrega[] = [];
  uniforme: Uniforme[] = [];

  MedicamentoName: Medicamento = {
    name: '',
    stock_actual: 0,
    stock_minimo: 0,
    estado: '',
    fecha_ingreso: '',
    fecha_vencimiento: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // Formulario de nueva entrega
  nuevaEntrega: Entrega = {
    Area: '',
    medicamento_id: 0,
    empleado_id: 0,
    cantidad: 0,
    firma: '',
    created_at: '',
    updated_at: '',
  };

  constructor(
    private medicamentoService: MedicamentoService,
    private uniformeService: UniformeService
  ) {}

  ngOnInit(): void {
    this.cargarMedicamentos();
    this.cargarEntregasUniforme();
    this.cargarEmpleados();
    this.cargaruniforme();
  }

  // 🧪 Cargar medicamentos desde API
  cargarMedicamentos(): void {
    this.medicamentoService.getMedicamentos().subscribe({
      next: (data: Medicamento[]) => {
        this.medicamentos = data;
        console.log('Medicamentos cargados:', data);
      },
      error: (error: any) => {
        console.error('Error al cargar medicamentos:', error);
        alert('Error al cargar los medicamentos');
      },
    });
  }

  cargaruniforme(): void {
    this.uniformeService.getUniforme().subscribe({
      next: (data: Uniforme[]) => {
        this.uniforme = data;
        console.log('Uniforme cargados:', data);
      },
      error: (error: any) => {
        console.error('Error al cargar uniforme:', error);
        alert('Error al cargar los uniforme');
      },
    });
  }

  // 👕 Cargar entregas
  cargarEntregasUniforme(): void {
    this.medicamentoService.getEntregas().subscribe({
      next: (data: Entrega[]) => {
        this.entrega = data;
        this.filtrarEntregasHoy();
         console.log('entrega cargados:', data);
      },
      error: (error: any) => {
        console.error('Error al cargar entregas:', error);
      },
    });
  }

  // 📅 Filtrar las entregas de hoy
  filtrarEntregasHoy(): void {
    const hoy = new Date().toISOString().split('T')[0];
    this.entregasHoy = this.entrega.filter((e) => {
      const fechaEntrega = new Date(e.created_at).toISOString().split('T')[0];
      return fechaEntrega === hoy;
    });
  }

  // 👨‍💼 Cargar empleados
  cargarEmpleados(): void {
    this.medicamentoService.getEmpleados().subscribe({
      next: (data: Empleados[]) => {
        this.empleados = data;
        console.log('Empleados cargados:', data);
      },
      error: (error: any) => {
        console.error('Error al cargar empleados:', error);
        alert('Error al cargar los empleados');
      },
    });
  }
}
