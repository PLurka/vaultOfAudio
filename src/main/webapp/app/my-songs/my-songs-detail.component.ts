import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISong } from 'app/shared/model/song.model';

@Component({
  selector: 'jhi-my-songs-detail',
  templateUrl: './my-songs-detail.component.html'
})
export class MySongsDetailComponent implements OnInit {
  song: ISong;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ song }) => {
      this.song = song;
    });
  }

  previousState() {
    window.history.back();
  }
}
