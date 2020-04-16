import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISong } from 'app/shared/model/song.model';
import { AccountService } from 'app/core';

@Component({
  selector: 'jhi-my-songs-detail',
  templateUrl: './my-songs-detail.component.html'
})
export class MySongsDetailComponent implements OnInit {
  song: ISong;
  currentAccount: any;

  constructor(protected activatedRoute: ActivatedRoute, protected accountService: AccountService) {}

  ngOnInit() {
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.activatedRoute.data.subscribe(({ song }) => {
      this.song = song;
    });
  }

  previousState() {
    window.history.back();
  }
}
