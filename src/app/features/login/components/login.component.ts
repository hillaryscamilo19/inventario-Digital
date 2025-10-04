// login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest, AuthService, LoginResponse } from '../../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData: LoginRequest = {
    username: '',
    password: ''
  };

  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    // Validar campos
    if (!this.loginData.username || !this.loginData.password) {
      this.errorMessage = 'Por favor ingrese usuario y contraseña';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Llamar al servicio con tipado correcto
    this.authService.login(this.loginData).subscribe({
      next: (response: LoginResponse) => {
        console.log('[v0] Login exitoso:', response);
        this.isLoading = false;
        
        // Redirigir al dashboard o página de medicamentos
        this.router.navigate(['/medicamento']);
      },
      error: (error: any) => {
        console.error('[v0] Error en login:', error);
        this.isLoading = false;
        
        // Manejar diferentes tipos de errores
        if (error.status === 401) {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        } else if (error.status === 0) {
          this.errorMessage = 'No se puede conectar al servidor';
        } else {
          this.errorMessage = 'Error al iniciar sesión. Intente nuevamente.';
        }
      },
      complete: () => {
        console.log('[v0] Login request completado');
      }
    });
  }

  clearError(): void {
    this.errorMessage = '';
  }
}