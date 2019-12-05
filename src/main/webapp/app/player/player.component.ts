import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-player',
  templateUrl: './player.component.html',
  styleUrls: ['player.component.scss']
})
export class PlayerComponent implements OnInit {
  message: string;
  files: Array<any>;
  state;
  currentFile: any;

  constructor() {
    this.message = 'PlayerComponent message';
    this.files = [{ name: 'First Song', artist: 'Inder' }, { name: 'Second Song', artist: 'You' }];
    this.currentFile = {};
  }

  ngOnInit() {}

  isFirstPlaying() {
    return false;
  }

  isLastPlaying() {
    return true;
  }
}
