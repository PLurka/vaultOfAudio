import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserEqualizerSetting } from 'app/shared/model/user-equalizer-setting.model';
import { UserEqualizerSettingService } from './user-equalizer-setting.service';
import { UserEqualizerSettingComponent } from './user-equalizer-setting.component';
import { UserEqualizerSettingDetailComponent } from './user-equalizer-setting-detail.component';
import { UserEqualizerSettingUpdateComponent } from './user-equalizer-setting-update.component';
import { UserEqualizerSettingDeletePopupComponent } from './user-equalizer-setting-delete-dialog.component';
import { IUserEqualizerSetting } from 'app/shared/model/user-equalizer-setting.model';

@Injectable({ providedIn: 'root' })
export class UserEqualizerSettingResolve implements Resolve<IUserEqualizerSetting> {
  constructor(private service: UserEqualizerSettingService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserEqualizerSetting> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<UserEqualizerSetting>) => response.ok),
        map((userEqualizerSetting: HttpResponse<UserEqualizerSetting>) => userEqualizerSetting.body)
      );
    }
    return of(new UserEqualizerSetting());
  }
}

export const userEqualizerSettingRoute: Routes = [
  {
    path: '',
    component: UserEqualizerSettingComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.userEqualizerSetting.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UserEqualizerSettingDetailComponent,
    resolve: {
      userEqualizerSetting: UserEqualizerSettingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.userEqualizerSetting.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UserEqualizerSettingUpdateComponent,
    resolve: {
      userEqualizerSetting: UserEqualizerSettingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.userEqualizerSetting.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: UserEqualizerSettingUpdateComponent,
    resolve: {
      userEqualizerSetting: UserEqualizerSettingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.userEqualizerSetting.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const userEqualizerSettingPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: UserEqualizerSettingDeletePopupComponent,
    resolve: {
      userEqualizerSetting: UserEqualizerSettingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.userEqualizerSetting.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
