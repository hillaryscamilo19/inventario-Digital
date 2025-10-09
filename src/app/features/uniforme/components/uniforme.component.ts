import { Component } from '@angular/core';
import {
  Uniforme,
  UniformeEntrega,
  UniformeService,
} from '../../../services/uniforme.service';
import { Empleados } from '../../../services/medicamento.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-uniforme',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './uniforme.component.html',
  styleUrl: './uniforme.component.css',
})
export class UniformeComponent {
  uniforme: Uniforme[] = [];
  empleado: Empleados[] = [];
  entrega: UniformeEntrega[] = [];

  searchTerm: string = '';
  estadoFiltro: string = '';

  // Formulario de nuevo medicamento
  nuevoMedicamento: Uniforme = {
    id: 0,
    name: '',
    stock_actual: 0,
    stock_minimo: 0,
    fecha_ingreso:  '',
    fecha_vencimiento: '',
    estado: ''
   
  };

  //Filtro de nombre de medicamento
  uniformeName: Uniforme = {
     id: 0,
    name: '',
    stock_actual: 0,
    stock_minimo: 0,
    fecha_ingreso:  '',
    fecha_vencimiento: '',
    estado: ''
  };

  // Formulario de nueva entrega
  nuevaEntrega: UniformeEntrega = {
    empleado_id: 0,
    uniforme_id: 0,
    size: '',
    area: '',
    cantidad: 0,
    firma: '',
  };

  // Datos estáticos para los selects
  colaboradores: Empleados = {
    codigoEmpleado: '',
    nombre: '',
    apellido: '',
    area: '',
    cargo: '',
    activo: '',
  };

  areas = [
    { label: 'Farmacia', value: 'farmacia' },
    { label: 'Enfermería', value: 'enfermeria' },
    { label: 'Administración', value: 'administracion' },
  ];

  constructor(private uniformeService: UniformeService) {}
  ngOnInit(): void {
    this.cargarUniforme();
    this.cargarEntregas();
    this.cargarEmpleados();
  }

  abrirModal(modalId: string): void {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) modal.showModal();
  }

  // Seleccionar medicamento para entrega
  seleccionarUniforme(uniforme: Uniforme): void {
    this.nuevaEntrega.id = uniforme.id || 0;
  }

  // Cargar empleados desde la API
  cargarEmpleados(): void {
    this.uniformeService.getEmpleados().subscribe({
      next: (data: Empleados[]) => {
        this.empleado = data;
        console.log('empleado cargados:', data);
      },
      error: (error: any) => {
        console.error('Error al cargar empleados:', error);
        alert('Error al cargar los empleados');
      },
    });
  }

  // Filtrar medicamentos
  get uniformeFiltrados(): Uniforme[] {
    return this.uniforme.filter((med) => {
      const matchSearch = med.name
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      const matchEstado = !this.estadoFiltro || med.name === this.estadoFiltro;
      return matchSearch && matchEstado;
    });
  }

  // Cargar medicamentos desde la API
  cargarUniforme(): void {
    this.uniformeService.getMedicamentos().subscribe({
      next: (data: Uniforme[]) => {
        this.uniforme = data;
        console.log('Medicamentos cargados:', data);
      },
      error: (error: any) => {
        console.error('Error al cargar medicamentos:', error);
        alert('Error al cargar los medicamentos');
      },
    });
  }

  // Cargar entregas desde la API
  cargarEntregas(): void {
    this.uniformeService.getEntregas().subscribe({
      next: (data: UniformeEntrega[]) => {
        this.entrega = data;
        console.log('Entregas cargadas:', data);
      },
      error: (error: any) => {
        console.error('Error al cargar entregas:', error);
      },
    });
  }
  // Obtener clase de badge según estado
  getBadgeClass(estado: string): string {
    switch (estado?.toLowerCase()) {
      case 'disponible':
        return 'badge-success';
      case 'agotado':
        return 'badge-error';
      case 'próximo a vencer':
        return 'badge-warning';
      default:
        return 'badge-neutral';
    }
  }
}
