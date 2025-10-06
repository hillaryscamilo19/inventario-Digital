import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Medicamento {
  id?: number;
  name: string;
  descripcion?: string;
  stock_actual?: number;
  stock_minimo?: number;
  estado?: string;
}

export interface Entrega {
  id?: number;
  area: string,
  empleado_id: number;
  departamento: string;
  medicamento_id: number;
  cantidad: number;
  firma: string;
  fecha?: string;
  created_at: string,
  updated_at: string
}

@Injectable({
  providedIn: 'root',
})
export class MedicamentoService {
  private apiUrl = 'http://10.0.0.15:8000/medicamento';
  private entregaUrl = 'http://10.0.0.15:8000/medicamento/entrega';

  constructor(private http: HttpClient) {}

  /** 🔐 Helper: genera headers con el token */
  private getAuthHeaders(): HttpHeaders {
    const token =
      localStorage.getItem('access_token') || localStorage.getItem('token');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

    private getHttpOptions() {
    const token = localStorage.getItem('token'); // o access_token según cómo lo guardes
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  // Obtener todos los medicamentos
  getMedicamentos(): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(this.apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  // Crear un nuevo medicamento
  crearMedicamento(medicamento: Medicamento): Observable<Medicamento> {
    return this.http.post<Medicamento>(this.apiUrl, medicamento, {
      headers: this.getAuthHeaders(),
    });
  }

  // Obtener todas las entregas
  getEntregas(): Observable<Entrega[]> {
    return this.http.get<Entrega[]>(this.entregaUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  // Registrar una nueva entrega
  registrarEntrega(entrega: Entrega): Observable<Entrega> {
    return this.http.post<Entrega>(this.entregaUrl, entrega, {
      headers: this.getAuthHeaders(),
    });
  }
}
