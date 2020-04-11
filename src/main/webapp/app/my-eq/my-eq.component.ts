import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-my-eq',
  templateUrl: './my-eq.component.html',
  styleUrls: ['my-eq.component.scss']
})
export class MyEqComponent implements OnInit {
  message: string;

  constructor() {
    this.message = 'MyEqComponent message';
  }

  ngOnInit() {}
}
