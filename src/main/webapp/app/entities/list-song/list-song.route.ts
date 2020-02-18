import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ListSong } from 'app/shared/model/list-song.model';
import { ListSongService } from './list-song.service';
import { ListSongComponent } from './list-song.component';
import { ListSongDetailComponent } from './list-song-detail.component';
import { ListSongUpdateComponent } from './list-song-update.component';
import { ListSongDeletePopupComponent } from './list-song-delete-dialog.component';
import { IListSong } from 'app/shared/model/list-song.model';

@Injectable({ providedIn: 'root' })
export class ListSongResolve implements Resolve<IListSong> {
  constructor(private service: ListSongService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IListSong> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ListSong>) => response.ok),
        map((listSong: HttpResponse<ListSong>) => listSong.body)
      );
    }
    return of(new ListSong());
  }
}

export const listSongRoute: Routes = [
  {
    path: '',
    component: ListSongComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.listSong.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ListSongDetailComponent,
    resolve: {
      listSong: ListSongResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.listSong.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ListSongUpdateComponent,
    resolve: {
      listSong: ListSongResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.listSong.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ListSongUpdateComponent,
    resolve: {
      listSong: ListSongResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.listSong.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const listSongPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ListSongDeletePopupComponent,
    resolve: {
      listSong: ListSongResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'vaultOfAudioApp.listSong.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
