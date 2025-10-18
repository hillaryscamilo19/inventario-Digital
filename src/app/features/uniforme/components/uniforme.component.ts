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
  nuevouniforme: Uniforme = {
    id: 0,
    name: '',
    stock_actual: 0,
    stock_minimo: 0,
    fecha_ingreso: '',
    fecha_vencimiento: '',
    estado: '',
    created_at: '',
    updated_at: '',
  };

  //Filtro de nombre de medicamento
  uniformeName: Uniforme = {
    id: 0,
    name: '',
    stock_actual: 0,
    stock_minimo: 0,
    fecha_ingreso: '',
    fecha_vencimiento: '',
    estado: '',
    created_at: '',
    updated_at: '',
  };

  // Formulario de nueva entrega
  nuevaEntrega: UniformeEntrega = {
    empleado_id: 0,
    uniforme_id: 0,
    size: '',
    area: '',
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


  // Registrar nueva entrega
  registrarEntrega(): void {
    console.log('Datos de entrega:', this.nuevaEntrega);
    // Validación mínima
    if (
      !this.nuevaEntrega.area ||
      !this.nuevaEntrega.size||
      !this.nuevaEntrega.cantidad ||
      !this.nuevaEntrega.firma ||
      !this.nuevaEntrega.uniforme_id||
      this.nuevaEntrega.empleado_id == null
    ) {
      alert('Por favor complete todos los campos.');
      return;
    }

    // Asignar fechas automáticas
    const now = new Date().toISOString();
    this.nuevaEntrega.created_at = now;
    this.nuevaEntrega.updated_at = now;

    this.uniformeService.registrarEntrega(this.nuevaEntrega).subscribe({
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

  //Registrar uniforme 
  registrarUniforme() {
    this.nuevouniforme.fecha_ingreso = new Date(
      this.nuevouniforme.fecha_ingreso
    ).toISOString();

    this.nuevouniforme.fecha_vencimiento = new Date(
      this.nuevouniforme.fecha_vencimiento
    ).toISOString();

    this.nuevouniforme.created_at = new Date().toISOString();
    this.nuevouniforme.updated_at = new Date().toISOString();

    this.uniformeService.crearUniforme(this.nuevouniforme).subscribe({
      next: () => {
        alert('Uniforme registrado correctamente');
        this.cargarUniforme();
        (document.getElementById('my_modal_5') as any).close();
        this.nuevouniforme = {
          id: 0,
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
    this.uniformeService.getUniforme().subscribe({
      next: (data: Uniforme[]) => {
        this.uniforme = data;
        console.log('Uniforme cargados:', data);
      },
      error: (error: any) => {
        console.error('Error al cargar Uniforme:', error);
        alert('Error al cargar los Uniforme');
      },
    });
  }


  limpiarFormularioEntrega(): void {
    const now = new Date().toISOString();
    this.nuevaEntrega = {
      empleado_id: 0,
      area: '',
      size: '',
      uniforme_id: 0,
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
