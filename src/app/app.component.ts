import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DatePickerModule } from "primeng/datepicker";
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IconFieldModule,SelectModule , InputIconModule, CardModule,TableModule,ColorPickerModule, DatePickerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
[x: string]: any;
 title = 'Inventario RRHH';
  currentYear = new Date().getFullYear();
color: any;
}
