import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGroupList } from 'app/shared/model/group-list.model';

@Component({
  selector: 'jhi-group-list-detail',
  templateUrl: './group-list-detail.component.html'
})
export class GroupListDetailComponent implements OnInit {
  groupList: IGroupList;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ groupList }) => {
      this.groupList = groupList;
    });
  }

  previousState() {
    window.history.back();
  }
}
