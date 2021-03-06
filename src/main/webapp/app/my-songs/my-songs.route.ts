import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { MySongsComponent } from './my-songs.component';
import { SongResolve } from 'app/entities/song';
import { MySongsUpdateComponent } from 'app/my-songs/my-songs-update.component';
import { MySongsDeletePopupComponent } from 'app/my-songs/my-songs-delete-dialog.component';
import { MySongsDetailComponent } from 'app/my-songs/my-songs-detail.component';

export const MY_SONGS_ROUTE: Routes = [
  {
    path: 'my-songs',
    component: MySongsComponent,
    data: {
      authorities: [],
      pageTitle: 'my-songs.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view-song',
    component: MySongsDetailComponent,
    resolve: {
      song: SongResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.song.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new-song',
    component: MySongsUpdateComponent,
    resolve: {
      song: SongResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.song.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit-song',
    component: MySongsUpdateComponent,
    resolve: {
      song: SongResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.song.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const MY_SONGS_POPUP_ROUTE: Routes = [
  {
    path: ':id/delete-song',
    component: MySongsDeletePopupComponent,
    resolve: {
      song: SongResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.song.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
