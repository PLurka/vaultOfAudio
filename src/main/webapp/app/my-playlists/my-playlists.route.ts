import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { MyPlaylistsComponent } from './my-playlists.component';
import { MyPlaylistsDeletePopupComponent } from 'app/my-playlists/my-playlists-delete-dialog.component';
import { MyPlaylistsDetailComponent } from 'app/my-playlists/my-playlists-detail.component';
import { MyPlaylistsUpdateComponent } from 'app/my-playlists/my-playlists-update.component';
import { PlaylistDeletePopupComponent, PlaylistDetailComponent, PlaylistResolve, PlaylistUpdateComponent } from 'app/entities/playlist';

export const MY_PLAYLISTS_ROUTE: Routes = [
  {
    path: 'my-playlists',
    component: MyPlaylistsComponent,
    data: {
      authorities: [],
      pageTitle: 'my-playlists.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view-playlist',
    component: MyPlaylistsDetailComponent,
    resolve: {
      playlist: PlaylistResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.playlist.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new-playlist',
    component: MyPlaylistsUpdateComponent,
    resolve: {
      playlist: PlaylistResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.playlist.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit-playlist',
    component: MyPlaylistsUpdateComponent,
    resolve: {
      playlist: PlaylistResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.playlist.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const MY_PLAYLISTS_POPUP_ROUTE: Routes = [
  {
    path: ':id/delete-playlist',
    component: MyPlaylistsDeletePopupComponent,
    resolve: {
      playlist: PlaylistResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.playlist.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
