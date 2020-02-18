import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserEqualizerSetting } from 'app/shared/model/user-equalizer-setting.model';

@Component({
  selector: 'jhi-user-equalizer-setting-detail',
  templateUrl: './user-equalizer-setting-detail.component.html'
})
export class UserEqualizerSettingDetailComponent implements OnInit {
  userEqualizerSetting: IUserEqualizerSetting;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userEqualizerSetting }) => {
      this.userEqualizerSetting = userEqualizerSetting;
    });
  }

  previousState() {
    window.history.back();
  }
}
