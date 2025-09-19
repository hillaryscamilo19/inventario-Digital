import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  forgotPassword() {
    throw new Error('Method not implemented.');
  }
  formLogin!: FormGroup<{
    email: FormControl<string | any>;
    password: FormControl<string | any>;
  }>;

  loading = false;
  submitted = false;
  error = '';
  returnUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      email: this.formBuilder.control('', {
        validators: [Validators.required],
      }),
      password: this.formBuilder.control('', {
        validators: [Validators.required],
      }),
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
        next: (response) => {
          console.log('Login exitoso:', response);
          this.router.navigate([this.returnUrl]);
        },
        error: (error) => {
          console.error('Error en login:', error);
          this.error =
            error.error?.detail ||
            'Error al iniciar sesión. Verifique sus credenciales.';
          this.loading = false;
        },
      });
  }
}
