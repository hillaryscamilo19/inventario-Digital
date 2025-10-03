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
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: LayoutComponent,   // layout con sidebar + navbar
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'inventario', component: InventarioComponent },
      { path: 'medicamento', component: MedicamentoComponent },
      { path: 'uniforme', component: UniformeComponent },
      { path: 'historial', component: HistorialComponent },
      { path: 'reportes', component: ReportesComponent },
      { path: 'alerta', component: AlertaComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  { path: '**', redirectTo: 'login' },
];
