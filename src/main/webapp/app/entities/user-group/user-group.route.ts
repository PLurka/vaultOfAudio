import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserGroup } from 'app/shared/model/user-group.model';
import { UserGroupService } from './user-group.service';
import { UserGroupComponent } from './user-group.component';
import { UserGroupDetailComponent } from './user-group-detail.component';
import { UserGroupUpdateComponent } from './user-group-update.component';
import { UserGroupDeletePopupComponent } from './user-group-delete-dialog.component';
import { IUserGroup } from 'app/shared/model/user-group.model';

@Injectable({ providedIn: 'root' })
export class UserGroupResolve implements Resolve<IUserGroup> {
  constructor(private service: UserGroupService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserGroup> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<UserGroup>) => response.ok),
        map((userGroup: HttpResponse<UserGroup>) => userGroup.body)
      );
    }
    return of(new UserGroup());
  }
}

export const userGroupRoute: Routes = [
  {
    path: '',
    component: UserGroupComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.userGroup.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UserGroupDetailComponent,
    resolve: {
      userGroup: UserGroupResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.userGroup.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UserGroupUpdateComponent,
    resolve: {
      userGroup: UserGroupResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.userGroup.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: UserGroupUpdateComponent,
    resolve: {
      userGroup: UserGroupResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.userGroup.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const userGroupPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: UserGroupDeletePopupComponent,
    resolve: {
      userGroup: UserGroupResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.userGroup.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
