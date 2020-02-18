import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUserList } from 'app/shared/model/user-list.model';
import { AccountService } from 'app/core';
import { UserListService } from './user-list.service';

@Component({
  selector: 'jhi-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit, OnDestroy {
  userLists: IUserList[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected userListService: UserListService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.userListService
      .query()
      .pipe(
        filter((res: HttpResponse<IUserList[]>) => res.ok),
        map((res: HttpResponse<IUserList[]>) => res.body)
      )
      .subscribe(
        (res: IUserList[]) => {
          this.userLists = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInUserLists();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IUserList) {
    return item.id;
  }

  registerChangeInUserLists() {
    this.eventSubscriber = this.eventManager.subscribe('userListListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
