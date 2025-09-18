import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/components/login.component';
import { RegistroComponent } from '../registro/components/registro.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent, // cuando entras a /auth
  },
  {
    path: 'register',
    component: RegistroComponent, // cuando entras a /auth/register
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
