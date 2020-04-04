import { Component, OnInit } from '@angular/core';
import { SongService } from 'app/entities/song';
import { Account, AccountService, IUser } from 'app/core';
import { ISong } from 'app/shared/model/song.model';

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

@Component({
  selector: 'jhi-my-songs',
  templateUrl: './my-songs.component.html',
  styleUrls: ['my-songs.component.scss']
})
export class MySongsComponent implements OnInit {
  message: string;
  songs: ISong[];
  user: IUser;
  currentAccount: Account;
  eventSubscriber: Subscription;

  constructor(
    protected songService: SongService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {
    this.message = 'MySongsComponent message';
  }

  loadAll() {
    let songsTemp: ISong[] = [];
    this.songService
      .getLogin()
      .pipe(
        filter((res: HttpResponse<string>) => res.ok),
        map((res: HttpResponse<string>) => res.body)
      )
      .subscribe((res: string) => {
        if (res != undefined) {
          console.error('getLogin(): ' + res);
          this.songService
            .query()
            .pipe(
              filter((resp: HttpResponse<ISong[]>) => resp.ok),
              map((resp: HttpResponse<ISong[]>) => resp.body)
            )
            .subscribe(
              (resp: ISong[]) => {
                resp.forEach(function(song) {
                  song.users.forEach(function(user) {
                    if (user['user']['login'] === res) {
                      songsTemp.push(song);
                    }
                  });
                });
              },
              (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
      });
    this.songs = songsTemp;
  }

  ngOnInit() {
    this.accountService.identity().then((account: Account) => {
      this.currentAccount = account;
    });
    this.loadAll();
    this.registerChangeInSongs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISong) {
    return item.id;
  }

  registerChangeInSongs() {
    this.eventSubscriber = this.eventManager.subscribe('songListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
