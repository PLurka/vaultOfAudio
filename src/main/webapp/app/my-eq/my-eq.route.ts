import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { MyEqComponent } from './my-eq.component';
import { EqualizerSettingResolve } from 'app/entities/equalizer-setting';
import { MyEqDeletePopupComponent } from 'app/my-eq/my-eq-delete-dialog.component';
import { MyEqDetailComponent } from 'app/my-eq/my-eq-detail.component';
import { MyEqUpdateComponent } from 'app/my-eq/my-eq-update.component';

export const MY_EQ_ROUTE: Routes = [
  {
    path: 'my-eq',
    component: MyEqComponent,
    data: {
      authorities: [],
      pageTitle: 'my-eq.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view-my-eq',
    component: MyEqDetailComponent,
    resolve: {
      equalizerSetting: EqualizerSettingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.equalizerSetting.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new-my-eq',
    component: MyEqUpdateComponent,
    resolve: {
      equalizerSetting: EqualizerSettingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.equalizerSetting.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit-my-eq',
    component: MyEqUpdateComponent,
    resolve: {
      equalizerSetting: EqualizerSettingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.equalizerSetting.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const MY_EQ_POPUP_ROUTE: Routes = [
  {
    path: ':id/delete-my-eq',
    component: MyEqDeletePopupComponent,
    resolve: {
      equalizerSetting: EqualizerSettingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.equalizerSetting.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
