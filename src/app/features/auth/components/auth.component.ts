import { Component,  OnInit } from '@angular/core';
import {  FormBuilder,  FormControl,  FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import  { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
   formLogin!: FormGroup
  loading = false
  submitted = false
  error = ""
  returnUrl = ""

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {
    // Redirigir al dashboard si ya está autenticado
    if (this.authService.currentUserValue) {
      this.router.navigate(["/dashboard"])
    }
  }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      email: ["", [Validators.required]], // Usamos 'email' como username
      password: ["", Validators.required],
    })

    // Obtener URL de retorno de los parámetros de consulta o usar '/dashboard' por defecto
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/dashboard"
  }

  // Getter para fácil acceso a los campos del formulario
  get f() {
    return this.formLogin.controls
  }

  onSubmit() {
    this.submitted = true

    // Detener si el formulario es inválido
    if (this.formLogin.invalid) {
      return
    }

    this.loading = true
    this.error = ""

    this.authService.login(this.f["email"].value, this.f["password"].value).subscribe({
      next: (response) => {
        console.log("Login exitoso:", response)
        this.router.navigate([this.returnUrl])
      },
      error: (error) => {
        console.error("Error en login:", error)
        this.error = error.error?.detail || "Error al iniciar sesión. Verifique sus credenciales."
        this.loading = false
      },
    })
  }

  // Método para manejar "Olvidé mi contraseña"
  forgotPassword() {
    // Implementar lógica para recuperar contraseña
    console.log("Recuperar contraseña")
  }

}
