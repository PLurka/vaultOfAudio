import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEqualizerSetting } from 'app/shared/model/equalizer-setting.model';
import { AccountService } from 'app/core';

@Component({
  selector: 'jhi-my-eq-detail',
  templateUrl: './my-eq-detail.component.html'
})
export class MyEqDetailComponent implements OnInit {
  equalizerSetting: IEqualizerSetting;
  currentAccount: any;

  constructor(protected activatedRoute: ActivatedRoute, protected accountService: AccountService) {}

  ngOnInit() {
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.activatedRoute.data.subscribe(({ equalizerSetting }) => {
      this.equalizerSetting = equalizerSetting;
    });
  }

  previousState() {
    window.history.back();
  }
}
