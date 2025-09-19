import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  [x: string]: any;
  title = 'Inventario RRHH';
  currentYear = new Date().getFullYear();
  color: any;
}
