import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from '../../../module/AuthModule/data-access/auth-user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
  constructor(private authService: AuthUserService,
    private router: Router
  ){}
  
  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

  // Getter público para obtener el nombre de usuario actual
  get currentUsername(): string | undefined {
    return this.authService.currentUser?.username;
  }

  logout(): void{
    this.authService.logout();
    this.router.navigate(["/home"]);
  }
}
