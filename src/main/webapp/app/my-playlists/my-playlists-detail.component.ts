import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlaylist } from 'app/shared/model/playlist.model';
import { AccountService } from 'app/core';

@Component({
  selector: 'jhi-my-playlists-detail',
  templateUrl: './my-playlists-detail.component.html'
})
export class MyPlaylistsDetailComponent implements OnInit {
  playlist: IPlaylist;
  currentAccount: any;

  constructor(protected activatedRoute: ActivatedRoute, protected accountService: AccountService) {}

  ngOnInit() {
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.activatedRoute.data.subscribe(({ playlist }) => {
      this.playlist = playlist;
    });
  }

  previousState() {
    window.history.back();
  }
}
