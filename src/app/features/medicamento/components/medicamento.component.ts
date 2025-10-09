import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Medicamento,
  Entrega,
  MedicamentoService,
  Empleados,
} from '../../../services/medicamento.service';

@Component({
  selector: 'app-medicamento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './medicamento.component.html',
  styleUrl: './medicamento.component.css',
})
export class MedicamentoComponent implements OnInit {
  // Listas de datos
  medicamentos: Medicamento[] = [];
  empleados: Empleados[] = [];
  entregas: Entrega[] = [];

  // Filtros
  searchTerm: string = '';
  estadoFiltro: string = '';

  // Formulario de nuevo medicamento
  nuevoMedicamento: Medicamento = {
    name: '',
    cantidad: 0,
    stock_minimo: 0,
    estado: '',
    fecha_ingreso: '',
    fecha_vencimiento:''

  };

  //Filtro de nombre de medicamento
  MedicamentoName: Medicamento = {
    name: '',
    cantidad: 0,
    stock_minimo: 0,
    estado: '',
    fecha_ingreso: '',
    fecha_vencimiento:''
  };

  // Formulario de nueva entrega
  nuevaEntrega: Entrega = {
    area: '',
    departamento: '',
    medicamento_id: 0,
    empleado_id: 0,
    cantidad: 0,
    firma: '',
    created_at: '',
    updated_at: '',
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

  constructor(private medicamentoService: MedicamentoService) {}

  ngOnInit(): void {
    this.cargarMedicamentos();
    this.cargarEntregas();
    this.cargarEmpleados();
  }

  // Cargar empleados desde la API
  cargarEmpleados(): void {
    this.medicamentoService.getEmpleados().subscribe({
      next: (data: Empleados[]) => {
        this.empleados = data;
        console.log('empleado cargados:', data);
      },
      error: (error: any) => {
        console.error('Error al cargar empleados:', error);
        alert('Error al cargar los empleados');
      },
    });
  }

  // Cargar medicamentos desde la API
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

  // Cargar entregas desde la API
  cargarEntregas(): void {
    this.medicamentoService.getEntregas().subscribe({
      next: (data: Entrega[]) => {
        this.entregas = data;
        console.log('Entregas cargadas:', data);
      },
      error: (error: any) => {
        console.error('Error al cargar entregas:', error);
      },
    });
  }

  abrirModal(modalId: string): void {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) modal.showModal();
  }

  // Registrar nuevo medicamento
  registrarMedicamento(): void {
    if (!this.nuevoMedicamento.name.trim()) {
      alert('Por favor ingrese el nombre del medicamento');
      return;
    }

    this.medicamentoService.crearMedicamento(this.nuevoMedicamento).subscribe({
      next: (response: any) => {
        console.log('Medicamento registrado:', response);
        alert('Medicamento registrado exitosamente');
        this.cargarMedicamentos(); // Recargar la lista
        this.nuevoMedicamento = { name: '' }; // Limpiar formulario
        this.cerrarModal('my_modal_5');
      },
      error: (error: any) => {
        console.error('Error al registrar medicamento:', error);
        alert('Error al registrar el medicamento');
      },
    });
  }

  // Registrar nueva entrega

  registrarEntrega(): void {
    // Validación mínima
    if (
      !this.nuevaEntrega.area ||
      !this.nuevaEntrega.medicamento_id ||
      !this.nuevaEntrega.cantidad ||
      !this.nuevaEntrega.firma ||
      !this.nuevaEntrega.empleado_id
    ) {
      alert('Por favor complete todos los campos.');
      return;
    }

    // Asignar fechas automáticas
    const now = new Date().toISOString();
    this.nuevaEntrega.created_at = now;
    this.nuevaEntrega.updated_at = now;

    this.medicamentoService.registrarEntrega(this.nuevaEntrega).subscribe({
      next: (res) => {
        console.log('Entrega registrada:', res);
        alert('Entrega registrada exitosamente');
        this.cargarEntregas();
        this.cerrarModal('my_modal_4');
        this.limpiarFormularioEntrega();
      },
      error: (err) => {
        console.error('Error al registrar entrega:', err);
        alert('Error al registrar entrega');
      },
    });
  }
  // Filtrar medicamentos
  get medicamentosFiltrados(): Medicamento[] {
    return this.medicamentos.filter((med) => {
      const matchSearch = med.name
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      const matchEstado =
        !this.estadoFiltro || med.estado === this.estadoFiltro;
      return matchSearch && matchEstado;
    });
  }

  // Seleccionar medicamento para entrega
  seleccionarMedicamento(medicamento: Medicamento): void {
    this.nuevaEntrega.medicamento_id = medicamento.id || 0;
  }

  limpiarFormularioEntrega(): void {
    const now = new Date().toISOString();
    this.nuevaEntrega = {
      empleado_id: 0,
      area: '',
      departamento: '',
      medicamento_id: 0,
      cantidad: 0,
      firma: '',
      created_at: now,
      updated_at: now,
    };
  }

  // Cerrar modal
  cerrarModal(modalId: string): void {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
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
