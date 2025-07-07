// admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthUserService } from '../data-access/auth-user.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthUserService, private router: Router) {}

  canActivate(
     next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | UrlTree {
  console.log("AdminGuard ejecutándose...");
  console.log("isAuthenticated:", this.authService.isAuthenticated);
  console.log("hasRole ADMIN:", this.authService.hasRole('ADMIN'));

  if (this.authService.isAuthenticated && this.authService.hasRole('ADMIN')) {
    return true; // Permite el acceso
  }
    
    // Redirect to login or home if not admin
    this.router.navigate(['/home']);
    return false;
  }
}