import { NgModule } from "@angular/core"
import { RouterModule, type Routes } from "@angular/router"
import { AuthGuard } from "./guard/auth.guard"
import { AuthComponent } from "./features/auth/components/auth.component"


const routes: Routes = [
  { path: "auth", component: AuthComponent },
  {
    path: "dashboard",
    loadChildren: () => import("./features/home/dashboard/dashboard.component").then((m) => m.DashboardComponent),
    canActivate: [AuthGuard],
  },

  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "**", redirectTo: "/auth" },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
