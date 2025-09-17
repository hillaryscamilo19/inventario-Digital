import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable } from "rxjs"
import  { Router } from "@angular/router"

export interface User {
  id: string
  email: string
  name: string
  role?: string
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>
  public currentUser: Observable<User | null>

  constructor(private router: Router) {
    // Inicializar con el usuario almacenado en localStorage si existe
    const storedUser = localStorage.getItem("currentUser")
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null)
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value
  }

  public get isAuthenticated(): boolean {
    const token = localStorage.getItem("authToken")
    const user = this.currentUserValue
    return !!(token && user)
  }

  login(email: string, password: string): Observable<any> {
    // Aquí implementarías la lógica de login con tu backend
    // Este es un ejemplo básico
    return new Observable((observer) => {
      // Simular llamada al backend
      if (email && password) {
        const user: User = {
          id: "1",
          email: email,
          name: "Usuario Demo",
          role: "admin",
        }

        const token = "demo-jwt-token" // En producción, esto vendría del backend

        // Guardar en localStorage
        localStorage.setItem("currentUser", JSON.stringify(user))
        localStorage.setItem("authToken", token)

        // Actualizar el subject
        this.currentUserSubject.next(user)

        observer.next({ user, token })
        observer.complete()
      } else {
        observer.error("Credenciales inválidas")
      }
    })
  }

  logout(): void {
    // Limpiar localStorage
    localStorage.removeItem("currentUser")
    localStorage.removeItem("authToken")

    // Actualizar el subject
    this.currentUserSubject.next(null)

    // Redirigir al login
    this.router.navigate(["/login"])
  }

  // Método para verificar si el token ha expirado
  isTokenExpired(): boolean {
    const token = localStorage.getItem("authToken")
    if (!token) return true

    try {
      const tokenData = JSON.parse(atob(token.split(".")[1]))
      const currentTime = Math.floor(Date.now() / 1000)
      return tokenData.exp < currentTime
    } catch (error) {
      return true
    }
  }
}
