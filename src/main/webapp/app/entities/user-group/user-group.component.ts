import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUserGroup } from 'app/shared/model/user-group.model';
import { AccountService } from 'app/core';
import { UserGroupService } from './user-group.service';

@Component({
  selector: 'jhi-user-group',
  templateUrl: './user-group.component.html'
})
export class UserGroupComponent implements OnInit, OnDestroy {
  userGroups: IUserGroup[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected userGroupService: UserGroupService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.userGroupService
      .query()
      .pipe(
        filter((res: HttpResponse<IUserGroup[]>) => res.ok),
        map((res: HttpResponse<IUserGroup[]>) => res.body)
      )
      .subscribe(
        (res: IUserGroup[]) => {
          this.userGroups = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInUserGroups();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IUserGroup) {
    return item.id;
  }

  registerChangeInUserGroups() {
    this.eventSubscriber = this.eventManager.subscribe('userGroupListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
