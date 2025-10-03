import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Medicamento, Entrega, MedicamentoService } from '../../../services/medicamento.service';


@Component({
  selector: 'app-medicamento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './medicamento.component.html',
  styleUrl: './medicamento.component.css'
})
export class MedicamentoComponent implements OnInit {
  // Listas de datos
  medicamentos: Medicamento[] = [];
  entregas: Entrega[] = [];
  
  // Filtros
  searchTerm: string = '';
  estadoFiltro: string = '';

  // Formulario de nuevo medicamento
  nuevoMedicamento: Medicamento = {
    name: ''
  };

  // Formulario de nueva entrega
  nuevaEntrega: Entrega = {
    colaborador_id: 0,
    departamento: '',
    medicamento_id: 0,
    cantidad: 0,
    firma_digital: ''
  };

  // Datos estáticos para los selects
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

  constructor(private medicamentoService: MedicamentoService) {}

  ngOnInit(): void {
    this.cargarMedicamentos();
    this.cargarEntregas();
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
      }
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
      }
    });
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
      }
    });
  }

  // Registrar nueva entrega
  registrarEntrega(): void {
    if (!this.nuevaEntrega.colaborador_id || !this.nuevaEntrega.medicamento_id || 
        !this.nuevaEntrega.cantidad || !this.nuevaEntrega.firma_digital) {
      alert('Por favor complete todos los campos');
      return;
    }

    this.medicamentoService.registrarEntrega(this.nuevaEntrega).subscribe({
      next: (response: any) => {
        console.log('Entrega registrada:', response);
        alert('Entrega registrada exitosamente');
        this.cargarEntregas(); // Recargar entregas
        this.cargarMedicamentos(); // Actualizar stock
        this.limpiarFormularioEntrega();
        this.cerrarModal('my_modal_4');
      },
      error: (error: any) => {
        console.error('Error al registrar entrega:', error);
        alert('Error al registrar la entrega');
      }
    });
  }

  // Filtrar medicamentos
  get medicamentosFiltrados(): Medicamento[] {
    return this.medicamentos.filter(med => {
      const matchSearch = med.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchEstado = !this.estadoFiltro || med.estado === this.estadoFiltro;
      return matchSearch && matchEstado;
    });
  }

  // Seleccionar medicamento para entrega
  seleccionarMedicamento(medicamento: Medicamento): void {
    this.nuevaEntrega.medicamento_id = medicamento.id || 0;
  }

  // Limpiar formulario de entrega
  limpiarFormularioEntrega(): void {
    this.nuevaEntrega = {
      colaborador_id: 0,
      departamento: '',
      medicamento_id: 0,
      cantidad: 0,
      firma_digital: ''
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
    switch(estado?.toLowerCase()) {
      case 'disponible': return 'badge-success';
      case 'agotado': return 'badge-error';
      case 'próximo a vencer': return 'badge-warning';
      default: return 'badge-neutral';
    }
  }
}