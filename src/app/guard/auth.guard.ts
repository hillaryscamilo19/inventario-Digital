import { Injectable } from "@angular/core"
import  { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"
import { Observable } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Aquí verificas si el usuario está autenticado
    // Puedes usar localStorage, sessionStorage, o un servicio de autenticación
    const isAuthenticated = this.checkAuthentication()

    if (isAuthenticated) {
      return true
    } else {
      // Redirige al login si no está autenticado
      this.router.navigate(["/login"])
      return false
    }
  }

  private checkAuthentication(): boolean {
    // Ejemplo usando localStorage - ajusta según tu implementación
    const token = localStorage.getItem("authToken")
    const user = localStorage.getItem("currentUser")

    // Verifica si existe token y no ha expirado
    if (token && user) {
      try {
        // Opcional: verificar si el token no ha expirado
        const tokenData = JSON.parse(atob(token.split(".")[1])) // Para JWT
        const currentTime = Math.floor(Date.now() / 1000)

        if (tokenData.exp && tokenData.exp > currentTime) {
          return true
        }
      } catch (error) {
        // Si hay error al parsear el token, considerarlo inválido
        this.clearAuthData()
        return false
      }
    }

    return false
  }

  private clearAuthData(): void {
    localStorage.removeItem("authToken")
    localStorage.removeItem("currentUser")
  }
}
