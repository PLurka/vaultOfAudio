import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserSong } from 'app/shared/model/user-song.model';
import { UserSongService } from './user-song.service';
import { UserSongComponent } from './user-song.component';
import { UserSongDetailComponent } from './user-song-detail.component';
import { UserSongUpdateComponent } from './user-song-update.component';
import { UserSongDeletePopupComponent } from './user-song-delete-dialog.component';
import { IUserSong } from 'app/shared/model/user-song.model';

@Injectable({ providedIn: 'root' })
export class UserSongResolve implements Resolve<IUserSong> {
  constructor(private service: UserSongService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserSong> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<UserSong>) => response.ok),
        map((userSong: HttpResponse<UserSong>) => userSong.body)
      );
    }
    return of(new UserSong());
  }
}

export const userSongRoute: Routes = [
  {
    path: '',
    component: UserSongComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.userSong.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UserSongDetailComponent,
    resolve: {
      userSong: UserSongResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.userSong.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UserSongUpdateComponent,
    resolve: {
      userSong: UserSongResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.userSong.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: UserSongUpdateComponent,
    resolve: {
      userSong: UserSongResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.userSong.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const userSongPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: UserSongDeletePopupComponent,
    resolve: {
      userSong: UserSongResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.userSong.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
