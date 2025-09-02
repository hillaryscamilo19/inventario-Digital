import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Toolbar } from "primeng/toolbar";
import { ToolbarModule } from 'primeng/toolbar';
import { Button } from "primeng/button";


@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Toolbar, ToolbarModule, Button],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
items: any;

}
