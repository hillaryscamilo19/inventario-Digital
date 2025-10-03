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
  colaborador_id: number;
  departamento: string;
  medicamento_id: number;
  cantidad: number;
  firma_digital: string;
  fecha?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {
  private apiUrl = 'http://10.0.0.15:8000/medicamento';
  private entregaUrl = 'http://10.0.0.15:8000/medicamento/entrega';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // Obtener todos los medicamentos
  getMedicamentos(): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(this.apiUrl);
  }

  // Crear un nuevo medicamento
  crearMedicamento(medicamento: Medicamento): Observable<Medicamento> {
    return this.http.post<Medicamento>(this.apiUrl, medicamento, this.httpOptions);
  }

  // Obtener todas las entregas
  getEntregas(): Observable<Entrega[]> {
    return this.http.get<Entrega[]>(this.entregaUrl);
  }

  // Registrar una nueva entrega
  registrarEntrega(entrega: Entrega): Observable<Entrega> {
    return this.http.post<Entrega>(this.entregaUrl, entrega, this.httpOptions);
  }
}