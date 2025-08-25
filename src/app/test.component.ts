import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  standalone: true,
  template: `
    <div style="padding:20px; text-align:center;">
      <h2>✅ Ruta de prueba funcionando!</h2>
      <p>Si ves este mensaje, el enrutador está configurado correctamente.</p>
    </div>
  `
})
export class TestComponent {}
