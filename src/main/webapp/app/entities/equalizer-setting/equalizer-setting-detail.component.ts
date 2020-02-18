import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEqualizerSetting } from 'app/shared/model/equalizer-setting.model';

@Component({
  selector: 'jhi-equalizer-setting-detail',
  templateUrl: './equalizer-setting-detail.component.html'
})
export class EqualizerSettingDetailComponent implements OnInit {
  equalizerSetting: IEqualizerSetting;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ equalizerSetting }) => {
      this.equalizerSetting = equalizerSetting;
    });
  }

  previousState() {
    window.history.back();
  }
}
