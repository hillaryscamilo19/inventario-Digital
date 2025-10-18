import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Medicamento,
  Entrega,
  MedicamentoService,
  Empleados,
  RegistroEntrega,
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
  entrega: RegistroEntrega[] = [];
  // Filtros
  searchTerm: string = '';
  estadoFiltro: string = '';
  // Formulario de nuevo medicamento
  nuevoMedicamento: Medicamento = {
    name: '',
    estado: '',
    stock_actual: 0,
    stock_minimo: 0,
    fecha_ingreso: new Date().toISOString(),
    fecha_vencimiento: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  //Filtro de nombre de medicamento
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
      next: (data: RegistroEntrega[]) => {
        this.entrega = data;
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
  registrarMedicamento() {
    this.nuevoMedicamento.fecha_ingreso = new Date(
      this.nuevoMedicamento.fecha_ingreso
    ).toISOString();

    this.nuevoMedicamento.fecha_vencimiento = new Date(
      this.nuevoMedicamento.fecha_vencimiento
    ).toISOString();

    this.nuevoMedicamento.created_at = new Date().toISOString();
    this.nuevoMedicamento.updated_at = new Date().toISOString();

    this.medicamentoService.crearMedicamento(this.nuevoMedicamento).subscribe({
      next: () => {
        alert('Medicamento registrado correctamente');
        this.cargarMedicamentos();
        (document.getElementById('my_modal_5') as any).close();
        this.nuevoMedicamento = {
          name: '',
          estado: '',
          stock_actual: 0,
          stock_minimo: 0,
          fecha_ingreso: new Date().toISOString(),
          fecha_vencimiento: new Date().toISOString(),
          created_at: '',
          updated_at: '',
        };
      },
      error: (err) => {
        console.error('Error al registrar medicamento:', err);
        alert('Error al registrar medicamento');
      },
    });
  }

  // Registrar nueva entrega
  registrarEntrega(): void {
    console.log('Datos de entrega:', this.nuevaEntrega);
    // Validación mínima
    if (
      !this.nuevaEntrega.Area ||
      !this.nuevaEntrega.medicamento_id ||
      !this.nuevaEntrega.cantidad ||
      !this.nuevaEntrega.firma ||
      this.nuevaEntrega.empleado_id == null
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
      Area: '',
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
