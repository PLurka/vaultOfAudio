import { Component, OnInit, OnDestroy } from '@angular/core';
import { IPlaylist } from 'app/shared/model/playlist.model';
import { PlaylistService } from 'app/entities/playlist';
import { AccountService } from 'app/core';

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { SongService } from 'app/entities/song';

@Component({
  selector: 'jhi-my-playlists',
  templateUrl: './my-playlists.component.html',
  styleUrls: ['my-playlists.component.scss']
})
export class MyPlaylistsComponent implements OnInit, OnDestroy {
  playlists: IPlaylist[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected playlistService: PlaylistService,
    protected songService: SongService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    let playlistsTemp: IPlaylist[] = [];
    this.songService
      .getLogin()
      .pipe(
        filter((res: HttpResponse<string>) => res.ok),
        map((res: HttpResponse<string>) => res.body)
      )
      .subscribe((res: string) => {
        if (res != undefined) {
          console.error('getLogin(): ' + res);
          this.playlistService
            .query()
            .pipe(
              filter((resp: HttpResponse<IPlaylist[]>) => resp.ok),
              map((resp: HttpResponse<IPlaylist[]>) => resp.body)
            )
            .subscribe(
              (resp: IPlaylist[]) => {
                /*this.playlists = resp;*/
                resp.forEach(function(playlist) {
                  playlist.users.forEach(function(user) {
                    if (user['user']['login'] === res) {
                      playlistsTemp.push(playlist);
                    }
                  });
                });
              },
              (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
      });
    this.playlists = playlistsTemp;
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPlaylists();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPlaylist) {
    return item.id;
  }

  registerChangeInPlaylists() {
    this.eventSubscriber = this.eventManager.subscribe('playlistListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
