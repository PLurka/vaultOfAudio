import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IListSong } from 'app/shared/model/list-song.model';
import { AccountService } from 'app/core';
import { ListSongService } from './list-song.service';

@Component({
  selector: 'jhi-list-song',
  templateUrl: './list-song.component.html'
})
export class ListSongComponent implements OnInit, OnDestroy {
  listSongs: IListSong[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected listSongService: ListSongService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.listSongService
      .query()
      .pipe(
        filter((res: HttpResponse<IListSong[]>) => res.ok),
        map((res: HttpResponse<IListSong[]>) => res.body)
      )
      .subscribe(
        (res: IListSong[]) => {
          this.listSongs = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInListSongs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IListSong) {
    return item.id;
  }

  registerChangeInListSongs() {
    this.eventSubscriber = this.eventManager.subscribe('listSongListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
