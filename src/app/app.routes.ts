import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

import { DashboardComponent } from './features/home/dashboard/dashboard.component';
import { LoginComponent } from './features/login/components/login.component';
import { InventarioComponent } from './features/inventario/components/inventario.component';
import { MedicamentoComponent } from './features/medicamento/components/medicamento.component';
import { UniformeComponent } from './features/uniforme/components/uniforme.component';
import { HistorialComponent } from './features/historial/components/historial.component';
import { ReportesComponent } from './features/reportes/components/reportes.component';
import { AlertaComponent } from './features/alerta/components/alerta.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'inventario',
    component: InventarioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'medicamento',
    component: MedicamentoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'uniforme',
    component: UniformeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'historial',
    component: HistorialComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reportes',
    component: ReportesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'alerta',
    component: AlertaComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'login' },
];
