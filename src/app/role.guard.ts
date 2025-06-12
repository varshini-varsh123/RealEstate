import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
 // Adjust path if needed
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Get the required roles from the route's data property
    const requiredRoles = route.data['roles'] as string[];

    if (!requiredRoles || requiredRoles.length === 0) {
      // If no roles are specified, allow access (or deny based on your default policy)
      console.warn('RoleGuard: No roles specified for this route. Access granted by default.');
      return true;
    }

    return this.authService.userRoles$.pipe(
      take(1), // Take the current value and then complete
      map(userRoles => {
        if (!userRoles || userRoles.length === 0) {
          // No roles found for the user (likely not logged in or token invalid)
          this.router.navigate(['/login']); // Redirect to login
          return false;
        }

        // Check if the user has at least one of the required roles
        const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));

        if (hasRequiredRole) {
          return true; // User has the necessary role
        } else {
          // User does not have the required role
          this.router.navigate(['/unauthorized']); // Redirect to an unauthorized access page
          return false;
        }
      })
    );
  }
}