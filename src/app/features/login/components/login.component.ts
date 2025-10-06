// login.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LoginRequest,
  AuthService,
  LoginResponse,
} from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  loginData: LoginRequest = {
    username: '',
    password: '',
  };

  isLoading = false;
  errorMessage = '';
  returnUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });

    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  get f() {
    return this.formLogin.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.formLogin.invalid) return;

    this.loading = true;
    this.error = '';
    this.authService;

    this.isLoading = true;
    this.errorMessage = '';

    // Llamar al servicio con tipado correcto
const credentials = {
  username: this.f['email'].value,
  password: this.f['password'].value,
};

this.authService.login(credentials).subscribe({
  next: (response) => {
    console.log('Login exitoso:', response);
    this.isLoading = false;

    this.router.navigate(['/medicamento']);
    this.authService.getCurrentUser(response);
  },
  error: (error) => {
    console.error('Error en login:', error);
    this.isLoading = false;

    if (error.status === 401) {
      this.errorMessage = 'Usuario o contraseña incorrectos';
    } else if (error.status === 0) {
      this.errorMessage = 'No se puede conectar al servidor';
    } else {
      this.errorMessage = 'Error al iniciar sesión. Intente nuevamente.';
    }
  },
});

  }

  clearError(): void {
    this.errorMessage = '';
  }
  forgotPassword() {
    console.log('Recuperar contraseña');
  }
}
