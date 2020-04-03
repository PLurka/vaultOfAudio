import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Crowd } from 'app/shared/model/crowd.model';
import { CrowdService } from './crowd.service';
import { CrowdComponent } from './crowd.component';
import { CrowdDetailComponent } from './crowd-detail.component';
import { CrowdUpdateComponent } from './crowd-update.component';
import { CrowdDeletePopupComponent } from './crowd-delete-dialog.component';
import { ICrowd } from 'app/shared/model/crowd.model';

@Injectable({ providedIn: 'root' })
export class CrowdResolve implements Resolve<ICrowd> {
  constructor(private service: CrowdService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICrowd> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Crowd>) => response.ok),
        map((crowd: HttpResponse<Crowd>) => crowd.body)
      );
    }
    return of(new Crowd());
  }
}

export const crowdRoute: Routes = [
  {
    path: '',
    component: CrowdComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.crowd.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CrowdDetailComponent,
    resolve: {
      crowd: CrowdResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.crowd.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CrowdUpdateComponent,
    resolve: {
      crowd: CrowdResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.crowd.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CrowdUpdateComponent,
    resolve: {
      crowd: CrowdResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.crowd.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const crowdPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CrowdDeletePopupComponent,
    resolve: {
      crowd: CrowdResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.crowd.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
