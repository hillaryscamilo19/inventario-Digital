import { Component,OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule]   ,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
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

    this.authService
      .login(this.f['email'].value, this.f['password'].value)
      .subscribe({
        next: (response: { access_token: string }) => {
          console.log('Login exitoso:', response);

          // ✅ guardar token si es necesario.
          localStorage.setItem('token', response.access_token);

          // ✅ marcar como autenticado en tu AuthService.
          this.authService.getCurrentUser(response);

          // ✅ redirigir.
          this.router.navigate([this.returnUrl]);

          // ✅ quitar loading.
          this.loading = false;
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

  forgotPassword() {
    console.log('Recuperar contraseña');
  }
}
