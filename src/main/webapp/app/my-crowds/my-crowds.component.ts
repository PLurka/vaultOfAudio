import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICrowd } from 'app/shared/model/crowd.model';
import { CrowdService } from 'app/entities/crowd';
import { AccountService } from 'app/core';

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

@Component({
  selector: 'jhi-my-crowds',
  templateUrl: './my-crowds.component.html',
  styleUrls: ['my-crowds.component.scss']
})
export class MyCrowdsComponent implements OnInit, OnDestroy {
  crowds: ICrowd[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected crowdService: CrowdService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.crowdService
      .query()
      .pipe(
        filter((res: HttpResponse<ICrowd[]>) => res.ok),
        map((res: HttpResponse<ICrowd[]>) => res.body)
      )
      .subscribe(
        (res: ICrowd[]) => {
          this.crowds = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCrowds();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICrowd) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInCrowds() {
    this.eventSubscriber = this.eventManager.subscribe('crowdListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
