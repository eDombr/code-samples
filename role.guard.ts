import { AuthService } from './../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { PermissionService } from '../services/permission.service';
import { RoleService } from '../services/role.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router,
              private permissionService: PermissionService,
              private authService: AuthService,
              private roleService: RoleService) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (!route.data.permission) {
      return true;
    }

    const permissions = this.permissionService.permissionSubject.value;

    if (!permissions.length) {
      const user = this.authService.getDecodedToken();
      const roleId = user.role.id;

      return this.roleService.getById(roleId)
        .pipe(
          map((data: any) => {
            this.permissionService.setPermissions(data.permissions);
            return this.isActivate(route.data.permission);
          })
        );
    }

    return this.isActivate(route.data.permission);
  }

  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.canActivate(route, state);
  }

  private isActivate(permission: string): boolean {
    if (this.permissionService.checkPermission(permission)) {
      return true;
    }

    this.router.navigate(['/404']);
    return false;
  }
}
