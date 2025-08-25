import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { AuthComponent } from './app/features/auth/components/auth.component';
import { InventarioComponent } from './app/features/inventario/components/inventario.component';
import { RegistroComponent } from './app/features/registro/components/registro.component';
import { ReportesComponent } from './app/features/reportes/components/reportes.component';
import { TestComponent } from './app/test.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: AuthComponent },
      { path: 'inventario', component: InventarioComponent },
      { path: 'registro', component: RegistroComponent },
      { path: 'reportes', component: ReportesComponent },
      { path: 'test', component: TestComponent }
    ]),
      provideHttpClient(withInterceptorsFromDi()) // 
  ]
}).catch(err => console.error(err));
