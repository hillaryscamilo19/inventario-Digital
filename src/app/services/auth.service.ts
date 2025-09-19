import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import {  Observable, BehaviorSubject } from "rxjs"
import { tap } from "rxjs/operators"

export interface User {
  id: number
  username: string
  email: string
  full_name: string
  role: string
  is_active: boolean
  created_at: string
  last_login: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
  expires_in: number
  user: User
}

export interface LoginRequest {
  username: string
  password: string
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://localhost:8000/api/auth"
  private currentUserSubject: BehaviorSubject<User | null>
  public currentUser: Observable<User | null>

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem("currentUser") || "null"),
    )
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value
  }

  login(username: string, password: string): Observable<LoginResponse> {
    // FastAPI OAuth2PasswordRequestForm espera form-data
    const formData = new FormData()
    formData.append("username", username)
    formData.append("password", password)

    return this.http.post<LoginResponse>(`${this.apiUrl}/token`, formData).pipe(
      tap((response) => {
        // Guardar token y usuario en localStorage
        localStorage.setItem("access_token", response.access_token)
        localStorage.setItem("currentUser", JSON.stringify(response.user))
        this.currentUserSubject.next(response.user)
      }),
    )
  }

  logout(): void {
    // Remover datos del localStorage
    localStorage.removeItem("access_token")
    localStorage.removeItem("currentUser")
    this.currentUserSubject.next(null)
  }

  getToken(): string | null {
    return localStorage.getItem("access_token")
  }

  isAuthenticated(): boolean {
    const token = this.getToken()
    if (!token) return false

    // Verificar si el token no ha expirado
    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      const currentTime = Math.floor(Date.now() / 1000)
      return payload.exp > currentTime
    } catch {
      return false
    }
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`)
  }

  hasRole(roles: string[]): boolean {
    const user = this.currentUserValue
    return user ? roles.includes(user.role) : false
  }

  isAdmin(): boolean {
    return this.hasRole(["administrador"])
  }

  isManager(): boolean {
    return this.hasRole(["administrador", "encargado"])
  }
}
