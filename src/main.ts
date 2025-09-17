import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppComponent } from './app/app.component';
import { AuthComponent } from './app/features/auth/components/auth.component';
import { InventarioComponent } from './app/features/inventario/components/inventario.component';
import { RegistroComponent } from './app/features/registro/components/registro.component';
import { ReportesComponent } from './app/features/reportes/components/reportes.component';
import { TestComponent } from './app/test.component';
import { routes } from './app/app.routes';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
  ]
}).catch(err => console.error(err));
