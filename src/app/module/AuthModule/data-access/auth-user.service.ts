import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
}

interface DecodedToken {
  sub: string;
  role: string; // Cadena separada por comas
  test?: string;
  iat: number;
  exp: number;
}

interface UserData {
  username: string;
  token: string;
  roles: string[]; // Convertiremos a array
}

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  private readonly authUrl = `${environment.backendUrl}/login`;
  private userSubject = new BehaviorSubject<UserData | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  get currentUser(): UserData | null {
    return this.userSubject.value;
  }

  get isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  get roles(): string[] {
    return this.currentUser?.roles || [];
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  login(username: string, password: string): Observable<LoginResponse> {
    const credentials: LoginRequest = { username, password };
    
    return this.http.post<LoginResponse>(this.authUrl, credentials).pipe(
      tap(response => {
        const decodedToken = this.decodeToken(response.access_token);
        const userData: UserData = {
          username,
          token: response.access_token,
          roles: this.parseRoles(decodedToken.role) // Convertimos la cadena a array
        };
        
        localStorage.setItem('currentUser', JSON.stringify(userData));
        this.userSubject.next(userData);
      })
    );
  }

  private parseRoles(rolesString: string): string[] {
    // Convierte "ADMIN,DBA" a ["ADMIN", "DBA"]
    return rolesString.split(',').map(role => role.trim());
  }

  private decodeToken(token: string): DecodedToken {
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Error decoding token', error);
      throw new Error('Invalid token');
    }
  }
  register(userData: { email: string; password: string; username: string; role: string }) {
  return this.http.post(`${environment.backendUrl}/v1/users`, userData);
}

  logout(): void {
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);
  }
}