import { Component, OnInit } from '@angular/core';
import { SongService } from 'app/entities/song';
import { AccountService } from 'app/core';
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
  currentAccount: any;
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
    this.songService
      .query()
      .pipe(
        filter((res: HttpResponse<ISong[]>) => res.ok),
        map((res: HttpResponse<ISong[]>) => res.body)
      )
      .subscribe(
        (res: ISong[]) => {
          this.songs = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
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
