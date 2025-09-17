import { Component, type OnInit } from '@angular/core';
import { type FormBuilder, type FormGroup, Validators } from '@angular/forms';
import type { Router, ActivatedRoute } from '@angular/router';
import type { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  returnUrl: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // Redirigir al dashboard si ya está autenticado
    if (this.authService.currentUserValue) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required]], // Usamos 'email' como username
      password: ['', Validators.required],
    });

    // Obtener URL de retorno de los parámetros de consulta o usar '/dashboard' por defecto
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  // Getter para fácil acceso a los campos del formulario
  get f() {
    return this.formLogin.controls;
  }

  onSubmit() {
    this.submitted = true;

    // Detener si el formulario es inválido
    if (this.formLogin.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService
      .login(this.f['email'].value, this.f['password'].value)
      .subscribe({
        next: (response: any) => {
          console.log('Login exitoso:', response);
          this.router.navigate([this.returnUrl]);
        },
        error: (error: { error: { detail: string } }) => {
          console.error('Error en login:', error);
          this.error =
            error.error?.detail ||
            'Error al iniciar sesión. Verifique sus credenciales.';
          this.loading = false;
        },
      });
  }

  // Método para manejar "Olvidé mi contraseña"
  forgotPassword() {
    // Implementar lógica para recuperar contraseña
    console.log('Recuperar contraseña');
  }
}
