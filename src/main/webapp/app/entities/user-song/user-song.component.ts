import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUserSong } from 'app/shared/model/user-song.model';
import { AccountService } from 'app/core';
import { UserSongService } from './user-song.service';

@Component({
  selector: 'jhi-user-song',
  templateUrl: './user-song.component.html'
})
export class UserSongComponent implements OnInit, OnDestroy {
  userSongs: IUserSong[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected userSongService: UserSongService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.userSongService
      .query()
      .pipe(
        filter((res: HttpResponse<IUserSong[]>) => res.ok),
        map((res: HttpResponse<IUserSong[]>) => res.body)
      )
      .subscribe(
        (res: IUserSong[]) => {
          this.userSongs = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInUserSongs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IUserSong) {
    return item.id;
  }

  registerChangeInUserSongs() {
    this.eventSubscriber = this.eventManager.subscribe('userSongListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
