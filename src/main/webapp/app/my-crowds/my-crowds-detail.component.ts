import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ICrowd } from 'app/shared/model/crowd.model';

@Component({
  selector: 'jhi-my-crowds-detail',
  templateUrl: './my-crowds-detail.component.html'
})
export class MyCrowdsDetailComponent implements OnInit {
  crowd: ICrowd;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ crowd }) => {
      this.crowd = crowd;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
