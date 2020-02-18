import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEqualizerSetting } from 'app/shared/model/equalizer-setting.model';
import { AccountService } from 'app/core';
import { EqualizerSettingService } from './equalizer-setting.service';

@Component({
  selector: 'jhi-equalizer-setting',
  templateUrl: './equalizer-setting.component.html'
})
export class EqualizerSettingComponent implements OnInit, OnDestroy {
  equalizerSettings: IEqualizerSetting[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected equalizerSettingService: EqualizerSettingService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.equalizerSettingService
      .query()
      .pipe(
        filter((res: HttpResponse<IEqualizerSetting[]>) => res.ok),
        map((res: HttpResponse<IEqualizerSetting[]>) => res.body)
      )
      .subscribe(
        (res: IEqualizerSetting[]) => {
          this.equalizerSettings = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInEqualizerSettings();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IEqualizerSetting) {
    return item.id;
  }

  registerChangeInEqualizerSettings() {
    this.eventSubscriber = this.eventManager.subscribe('equalizerSettingListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
