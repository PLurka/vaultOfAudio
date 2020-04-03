import { Component, OnInit } from '@angular/core';
import { SongService } from 'app/entities/song';
import { Account, AccountService, IUser, UserService } from 'app/core';
import { ISong } from 'app/shared/model/song.model';

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { IUserSong, UserSong } from 'app/shared/model/user-song.model';

@Component({
  selector: 'jhi-my-songs',
  templateUrl: './my-songs.component.html',
  styleUrls: ['my-songs.component.scss']
})
export class MySongsComponent implements OnInit {
  message: string;
  songs: ISong[];
  userSongs: IUserSong[];
  user: IUser;
  currentAccount: Account;
  eventSubscriber: Subscription;
  login: string;

  constructor(
    protected userService: UserService,
    protected songService: SongService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {
    this.message = 'MySongsComponent message';
    /*this.songService
      .getLogin()
      .pipe(
        filter((res: HttpResponse<string>) => res.ok),
        map((res: HttpResponse<string>) => res.body)
      )
      .subscribe((res: string) => {
        if (res != undefined) {
          console.error('getLogin(): ' + res);
          this.login = res;
        }
      });*/
  }

  loadAll() {
    this.userSongService
      .query()
      .pipe(
        filter((res: HttpResponse<IUserSong[]>) => res.ok),
        map((res: HttpResponse<IUserSong[]>) => res.body)
      )
      .subscribe(
        (res: IUserSong[]) => {
          this.userSongs = res.filter(item => item.user.login == this.login);
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
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
