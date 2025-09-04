import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterOutlet } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara'; // tema Lara como preset
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DatePickerModule } from 'primeng/datepicker';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { FloatLabelModule } from 'primeng/floatlabel';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({ theme: { preset: Lara } })
  ],
  imports: [ButtonModule, ,RouterOutlet,FloatLabelModule, IconFieldModule,SelectModule , InputIconModule, CardModule,TableModule,ColorPickerModule, DatePickerModule] // importa los módulos de PrimeNG que usarás
};

bootstrapApplication(AppComponent, appConfig);
