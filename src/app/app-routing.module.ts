import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InventarioComponent } from "./features/inventario/components/inventario.component";
import { RegistroComponent } from "./features/registro/components/registro.component";
import { ReportesComponent } from "./features/reportes/components/reportes.component";
import { AuthComponent } from "./features/auth/components/auth.component";
import { TestComponent } from "./test.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'inventario', component: InventarioComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'login', component: AuthComponent },
    { path: 'test', component: TestComponent }  // ✅ ruta de prueba
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
