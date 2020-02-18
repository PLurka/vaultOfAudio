import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUserEqualizerSetting } from 'app/shared/model/user-equalizer-setting.model';
import { AccountService } from 'app/core';
import { UserEqualizerSettingService } from './user-equalizer-setting.service';

@Component({
  selector: 'jhi-user-equalizer-setting',
  templateUrl: './user-equalizer-setting.component.html'
})
export class UserEqualizerSettingComponent implements OnInit, OnDestroy {
  userEqualizerSettings: IUserEqualizerSetting[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected userEqualizerSettingService: UserEqualizerSettingService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.userEqualizerSettingService
      .query()
      .pipe(
        filter((res: HttpResponse<IUserEqualizerSetting[]>) => res.ok),
        map((res: HttpResponse<IUserEqualizerSetting[]>) => res.body)
      )
      .subscribe(
        (res: IUserEqualizerSetting[]) => {
          this.userEqualizerSettings = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInUserEqualizerSettings();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IUserEqualizerSetting) {
    return item.id;
  }

  registerChangeInUserEqualizerSettings() {
    this.eventSubscriber = this.eventManager.subscribe('userEqualizerSettingListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
