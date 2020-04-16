import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { MyCrowdsComponent } from './my-crowds.component';
import { CrowdResolve } from 'app/entities/crowd';
import { MyCrowdsDetailComponent } from 'app/my-crowds/my-crowds-detail.component';
import { MyCrowdsUpdateComponent } from 'app/my-crowds/my-crowds-update.component';
import { MyCrowdsDeletePopupComponent } from 'app/my-crowds/my-crowds-delete-dialog.component';

export const MY_CROWDS_ROUTE: Routes = [
  {
    path: 'my-crowds',
    component: MyCrowdsComponent,
    data: {
      authorities: [],
      pageTitle: 'my-crowds.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view-crowd',
    component: MyCrowdsDetailComponent,
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
    path: 'new-crowd',
    component: MyCrowdsUpdateComponent,
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
    path: ':id/edit-crowd',
    component: MyCrowdsUpdateComponent,
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

export const MY_CROWDS_POPUP_ROUTE: Routes = [
  {
    path: ':id/delete-crowd',
    component: MyCrowdsDeletePopupComponent,
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
