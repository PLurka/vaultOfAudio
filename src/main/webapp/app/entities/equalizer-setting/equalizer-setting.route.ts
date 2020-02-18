import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EqualizerSetting } from 'app/shared/model/equalizer-setting.model';
import { EqualizerSettingService } from './equalizer-setting.service';
import { EqualizerSettingComponent } from './equalizer-setting.component';
import { EqualizerSettingDetailComponent } from './equalizer-setting-detail.component';
import { EqualizerSettingUpdateComponent } from './equalizer-setting-update.component';
import { EqualizerSettingDeletePopupComponent } from './equalizer-setting-delete-dialog.component';
import { IEqualizerSetting } from 'app/shared/model/equalizer-setting.model';

@Injectable({ providedIn: 'root' })
export class EqualizerSettingResolve implements Resolve<IEqualizerSetting> {
  constructor(private service: EqualizerSettingService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEqualizerSetting> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<EqualizerSetting>) => response.ok),
        map((equalizerSetting: HttpResponse<EqualizerSetting>) => equalizerSetting.body)
      );
    }
    return of(new EqualizerSetting());
  }
}

export const equalizerSettingRoute: Routes = [
  {
    path: '',
    component: EqualizerSettingComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.equalizerSetting.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EqualizerSettingDetailComponent,
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
    path: 'new',
    component: EqualizerSettingUpdateComponent,
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
    path: ':id/edit',
    component: EqualizerSettingUpdateComponent,
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

export const equalizerSettingPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: EqualizerSettingDeletePopupComponent,
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
