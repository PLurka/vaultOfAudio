import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IListSong } from 'app/shared/model/list-song.model';

@Component({
  selector: 'jhi-list-song-detail',
  templateUrl: './list-song-detail.component.html'
})
export class ListSongDetailComponent implements OnInit {
  listSong: IListSong;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ listSong }) => {
      this.listSong = listSong;
    });
  }

  previousState() {
    window.history.back();
  }
}
