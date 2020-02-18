import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserSong } from 'app/shared/model/user-song.model';

@Component({
  selector: 'jhi-user-song-detail',
  templateUrl: './user-song-detail.component.html'
})
export class UserSongDetailComponent implements OnInit {
  userSong: IUserSong;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userSong }) => {
      this.userSong = userSong;
    });
  }

  previousState() {
    window.history.back();
  }
}
