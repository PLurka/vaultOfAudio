import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserList } from 'app/shared/model/user-list.model';

@Component({
  selector: 'jhi-user-list-detail',
  templateUrl: './user-list-detail.component.html'
})
export class UserListDetailComponent implements OnInit {
  userList: IUserList;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userList }) => {
      this.userList = userList;
    });
  }

  previousState() {
    window.history.back();
  }
}
