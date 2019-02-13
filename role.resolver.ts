import { PermissionService } from './../services/permission.service';
import { AuthService } from './../services/auth.service';

import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { RoleService } from './../services/role.service';
import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class RoleResolver implements Resolve<any> {
  constructor(private roleService: RoleService,
              private authService: AuthService,
              private permissionService: PermissionService) {
  }

  public resolve(): Observable<any> {
    const user = this.authService.getDecodedToken();
    const roleId = user.role.id;

    return this.roleService.getById(roleId)
      .pipe(
        map((data: any) => {
          const rolePermissions = _.filter(data.permissions, p => p.group.type === 'public');
          this.permissionService.setPermissions(rolePermissions);
          return data;
        })
      );
  }
}
