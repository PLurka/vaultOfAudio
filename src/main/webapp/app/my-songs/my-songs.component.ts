import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-my-songs',
  templateUrl: './my-songs.component.html',
  styleUrls: ['my-songs.component.scss']
})
export class MySongsComponent implements OnInit {
  message: string;

  constructor() {
    this.message = 'MySongsComponent message';
  }

  ngOnInit() {}
}
