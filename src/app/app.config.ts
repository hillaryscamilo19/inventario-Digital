import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara'; // tema Lara como preset
import { ButtonModule } from 'primeng/button';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({ theme: { preset: Lara } })
  ],
  imports: [ButtonModule] // importa los módulos de PrimeNG que usarás
};

bootstrapApplication(AppComponent, appConfig);
