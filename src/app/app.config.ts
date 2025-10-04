import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterOutlet } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ButtonModule } from 'primeng/button';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({ theme: { preset: Lara } }),
  ],
  imports: [
    ButtonModule,
    RouterOutlet,
    FloatLabelModule,
    IconFieldModule,
    SelectModule,
    InputIconModule,
    CardModule,
    TableModule,
    ColorPickerModule,
    DatePickerModule,
  ], // importa los módulos de PrimeNG que usarás
};

bootstrapApplication(AppComponent, appConfig);
function providePrimeNG(arg0: {
  theme: { preset: any };
}):
  | import('@angular/core').Provider
  | import('@angular/core').EnvironmentProviders {
  throw new Error('Function not implemented.');
}
