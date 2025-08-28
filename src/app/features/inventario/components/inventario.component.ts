import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DatePickerModule } from 'primeng/datepicker';
import { AppComponent } from "../../../app.component";
import { SidebarComponent } from "../../home/sidebar/sidebar.component";

@Component({
  selector: 'app-inventario',
  standalone: true,

 imports: [ButtonModule, DatePickerModule, IconFieldModule, InputIconModule, ColorPickerModule, SidebarComponent],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent {

}
