import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthComponent } from './features/auth/components/auth.component';
import { ReportesComponent } from './features/reportes/components/reportes.component';
import { InventarioComponent } from './features/inventario/components/inventario.component';
import { RegistroComponent } from './features/registro/components/registro.component';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
@NgModule({
  declarations: [
    // 🚨 Aquí NO va AppComponent porque es standalone
    // Si AuthComponent, ReportesComponent, etc. también son standalone, tampoco van aquí
  ],
  imports: [
    BrowserModule,
    AppComponent, // ✅ se importa en lugar de declararlo
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DropdownModule
    
  ],
  providers: [],
  bootstrap: [] // ✅ sigue siendo bootstrap
})
export class AppModule { }

