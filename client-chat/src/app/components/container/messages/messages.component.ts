import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/entities/message';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  @Input() msg:Message
  @Input() selfUser: boolean
  constructor() { }

  ngOnInit(): void {
    console.log('message: ', this.msg);
  }

}
