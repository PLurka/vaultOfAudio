import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserList } from 'app/shared/model/user-list.model';
import { UserListService } from './user-list.service';
import { UserListComponent } from './user-list.component';
import { UserListDetailComponent } from './user-list-detail.component';
import { UserListUpdateComponent } from './user-list-update.component';
import { UserListDeletePopupComponent } from './user-list-delete-dialog.component';
import { IUserList } from 'app/shared/model/user-list.model';

@Injectable({ providedIn: 'root' })
export class UserListResolve implements Resolve<IUserList> {
  constructor(private service: UserListService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserList> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<UserList>) => response.ok),
        map((userList: HttpResponse<UserList>) => userList.body)
      );
    }
    return of(new UserList());
  }
}

export const userListRoute: Routes = [
  {
    path: '',
    component: UserListComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.userList.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UserListDetailComponent,
    resolve: {
      userList: UserListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.userList.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UserListUpdateComponent,
    resolve: {
      userList: UserListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.userList.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: UserListUpdateComponent,
    resolve: {
      userList: UserListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.userList.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const userListPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: UserListDeletePopupComponent,
    resolve: {
      userList: UserListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.userList.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
