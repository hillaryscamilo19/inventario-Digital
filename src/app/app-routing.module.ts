import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventarioComponent } from './features/inventario/components/inventario.component';
import { RegistroComponent } from './features/registro/components/registro.component';
import { ReportesComponent } from './features/reportes/components/reportes.component';
import { AuthComponent } from './features/auth/components/auth.component';
import { TestComponent } from './test.component';
import { LayoutComponent } from './layout/layout.component';
import { MedicamentoComponent } from './features/medicamento/medicamento.component';
import { DashboardComponent } from './features/home/dashboard/dashboard.component';
import { UniformeComponent } from './features/uniforme/uniforme.component';
import { HistorialComponent } from './features/historial/historial.component';
import { AlertaComponent } from './features/alerta/alerta.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'login', component: AuthComponent },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
