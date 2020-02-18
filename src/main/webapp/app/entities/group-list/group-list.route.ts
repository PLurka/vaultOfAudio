import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GroupList } from 'app/shared/model/group-list.model';
import { GroupListService } from './group-list.service';
import { GroupListComponent } from './group-list.component';
import { GroupListDetailComponent } from './group-list-detail.component';
import { GroupListUpdateComponent } from './group-list-update.component';
import { GroupListDeletePopupComponent } from './group-list-delete-dialog.component';
import { IGroupList } from 'app/shared/model/group-list.model';

@Injectable({ providedIn: 'root' })
export class GroupListResolve implements Resolve<IGroupList> {
  constructor(private service: GroupListService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IGroupList> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<GroupList>) => response.ok),
        map((groupList: HttpResponse<GroupList>) => groupList.body)
      );
    }
    return of(new GroupList());
  }
}

export const groupListRoute: Routes = [
  {
    path: '',
    component: GroupListComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.groupList.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: GroupListDetailComponent,
    resolve: {
      groupList: GroupListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.groupList.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: GroupListUpdateComponent,
    resolve: {
      groupList: GroupListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.groupList.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: GroupListUpdateComponent,
    resolve: {
      groupList: GroupListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.groupList.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const groupListPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: GroupListDeletePopupComponent,
    resolve: {
      groupList: GroupListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.groupList.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
