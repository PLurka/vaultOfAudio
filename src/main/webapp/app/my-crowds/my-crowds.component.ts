import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-my-crowds',
  templateUrl: './my-crowds.component.html',
  styleUrls: ['my-crowds.component.scss']
})
export class MyCrowdsComponent implements OnInit {
  message: string;

  constructor() {
    this.message = 'MyCrowdsComponent message';
  }

  ngOnInit() {}
}
