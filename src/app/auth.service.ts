import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginService } from './login.service';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode

// Define an interface for the decoded token payload
interface DecodedToken {
  userId: string;
  roles: string[]; // Assuming 'roles' is an array of strings in your JWT payload
  // Add other properties if your JWT payload has them (e.g., 'sub' for subject/username)
  sub:string;
  exp: number; // Expiration time
  iat: number; // Issued at time
  email:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userName:String;
  private email:String;
  private _userId:String;
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

  // New: BehaviorSubject to hold the user's roles
  private _userRoles = new BehaviorSubject<string[]>([]);
  userRoles$: Observable<string[]> = this._userRoles.asObservable();

  constructor(private http: HttpClient, private loginService: LoginService) {
    this.initializeAuthStatus(); // Call a method to initialize status and roles
  }

  // New method to initialize authentication status and roles from local storage
  private initializeAuthStatus(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        // Check if token is expired (optional but recommended)
        const currentTime = Date.now() / 1000; // current time in seconds
        if (decodedToken.exp > currentTime) {
          this._isLoggedIn.next(true);
          this._userRoles.next(decodedToken.roles || []); // Set roles from decoded token
          this._userId = decodedToken.userId;
          this.userName=decodedToken.sub;
        } else {
          // Token expired
          this.logout();
        }
      } catch (error) {
        console.error("Error decoding token or token is invalid:", error);
        this.logout(); // Invalidate session if token is bad
      }
    } else {
      this._isLoggedIn.next(false);
      this._userRoles.next([]);
    }
  }

  register(user: User): Observable<any> {
    return this.http.post('http://localhost:9091/auth/new', user, { responseType: 'text' });
  }

  login(credentials: any): Observable<any> {
    return this.loginService.userLogin(credentials).pipe(
      tap((token) => {
        localStorage.setItem('token', token);
         localStorage.setItem('isLoggedIn', 'true'); // No longer strictly needed if relying on token presence and validity
        this._isLoggedIn.next(true);

        try {
          const decodedToken: DecodedToken = jwtDecode(token);
          this._userRoles.next(decodedToken.roles || []); // Update roles upon successful login
          localStorage.setItem("userId",decodedToken.userId);
          localStorage.setItem("userName",decodedToken.sub);
          localStorage.setItem("email",decodedToken.email);
          localStorage.setItem("role",decodedToken.roles.toString());
        } catch (error) {
          console.error("Error decoding token after login:", error);
          this._userRoles.next([]); // Clear roles if decoding fails
        }
      })
    );
  }

  logout(): void {
    this._isLoggedIn.next(false); // Update the login status
    this._userRoles.next([]); // Clear user roles
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn'); // Clear persisted state
  }

  // New: Method to get the raw token (useful for interceptors)
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // New: Method to check if the user has any of the required roles
  hasRole(requiredRoles: string[]): boolean {
    const currentUserRoles = this._userRoles.getValue();
    if (!currentUserRoles || currentUserRoles.length === 0) {
      return false; // User has no roles assigned or not logged in
    }
    // Check if any of the user's roles match any of the required roles
    return requiredRoles.some(role => currentUserRoles.includes(role));
  }
}

export interface User {
  name: string;
  email: string;
  password: string;
  roles: string; // Consider if this should be 'roles: string[]' if registering with multiple roles
}