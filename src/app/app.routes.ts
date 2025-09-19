import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
     {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "dashboard",
        loadChildren: () => import("./features/home/dashboard/dashboard.module").then((m) => m.DashboardModule),
        canActivate: [AuthGuard],
      },
      {
        path: "admin",
        loadChildren: () => import("./features/home/admin/admin.module").then((m) => m.AdminModule),
        canActivate: [AuthGuard],
        data: { roles: ["administrador"] },
      },
      {
        path: "inventario",
        loadChildren: () => import("./features/inventario/inventario.module").then((m) => m.InventarioModule),
        canActivate: [AuthGuard],
      },
      {
        path: "uniforme",
        loadChildren: () => import("./features/uniforme/uniforme.module").then((m) => m.UniformeModule),
        canActivate: [AuthGuard],
      },
      {
        path: "medicamento",
        loadChildren: () => import("./features/medicamento/medicamento.module").then((m) => m.MedicamentoModule),
        canActivate: [AuthGuard],
      },
      {
        path: "reportes",
        loadChildren: () => import("./features/reportes/reportes.module").then((m) => m.ReportesModule),
        canActivate: [AuthGuard],
      },
      {
        path: "registro",
        loadChildren: () => import("./features/registro/registro.module").then((m) => m.RegistroModule),
        canActivate: [AuthGuard],
      },
      {
        path: "historial",
        loadChildren: () => import("./features/historial/historial.module").then((m) => m.HistorialModule),
        canActivate: [AuthGuard],
      },
      {
        path: "alerta",
        loadChildren: () => import("./features/alerta/alerta.module").then((m) => m.AlertaModule),
        canActivate: [AuthGuard],
      },
      { path: "", redirectTo: "/dashboard", pathMatch: "full" },
      { path: "**", redirectTo: "/login" },
];
