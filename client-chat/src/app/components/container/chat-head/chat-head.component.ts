import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-head',
  templateUrl: './chat-head.component.html',
  styleUrls: ['./chat-head.component.css']
})
export class ChatHeadComponent implements OnInit {

  usersNumber: number;
  constructor() {
    this.usersNumber = 0;
  }

  ngOnInit(): void {
  }

}
