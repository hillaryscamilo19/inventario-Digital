import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface UniformeEntrega {
  id?: number;
  empleado_id: number;
  uniforme_id: number;
  size: string;
  area: string;
  cantidad: number;
  firma: string;
  created_at: string,
  updated_at: string,
}
export interface Uniforme {
  id: number;
  name: string;
  stock_actual: number;
  stock_minimo: number;
  fecha_ingreso: string;
  fecha_vencimiento: string;
  estado: string; // Disponible | Próximo a vencer | Vencido | Bajo stock
  created_at: string,
  updated_at: string,
}

export interface Empleados {
  id?: number;
  codigoEmpleado: string;
  nombre: string;
  apellido: string;
  area: string;
  cargo: string;
  activo: string;
}

@Injectable({
  providedIn: 'root',
})
export class UniformeService {
  private apiUrl = 'http://10.0.0.15:8000/uniforme/';
  private ApiUrl = 'http://10.0.0.15:8000/api/empleado/';
  private entregaUrl = 'http://10.0.0.15:8000/uniforme/entrega';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token =
      localStorage.getItem('access_token') || localStorage.getItem('token');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  // Obtener todos los empleados
  getEmpleados(): Observable<Empleados[]> {
    return this.http.get<Empleados[]>(this.ApiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  // Obtener todos los uniforme
  getUniforme(): Observable<Uniforme[]> {
    return this.http.get<Uniforme[]>(this.apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  // Crear un nuevo medicamento
  crearUniforme(uniforme: Uniforme): Observable<Uniforme> {
    return this.http.post<Uniforme>(this.apiUrl, uniforme, {
      headers: this.getAuthHeaders(),
    });
  }


  // Registrar una nueva entrega
    registrarEntrega(entrega: UniformeEntrega): Observable<UniformeEntrega> {
      return this.http.post<UniformeEntrega>(this.entregaUrl, entrega, {
        headers: this.getAuthHeaders(),
      });
    }

  // Obtener todas las entregas
  getEntregas(): Observable<UniformeEntrega[]> {
    return this.http.get<UniformeEntrega[]>(this.entregaUrl, {
      headers: this.getAuthHeaders(),
    });
  }
}
