import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGroupList } from 'app/shared/model/group-list.model';
import { AccountService } from 'app/core';
import { GroupListService } from './group-list.service';

@Component({
  selector: 'jhi-group-list',
  templateUrl: './group-list.component.html'
})
export class GroupListComponent implements OnInit, OnDestroy {
  groupLists: IGroupList[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected groupListService: GroupListService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.groupListService
      .query()
      .pipe(
        filter((res: HttpResponse<IGroupList[]>) => res.ok),
        map((res: HttpResponse<IGroupList[]>) => res.body)
      )
      .subscribe(
        (res: IGroupList[]) => {
          this.groupLists = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInGroupLists();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IGroupList) {
    return item.id;
  }

  registerChangeInGroupLists() {
    this.eventSubscriber = this.eventManager.subscribe('groupListListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
