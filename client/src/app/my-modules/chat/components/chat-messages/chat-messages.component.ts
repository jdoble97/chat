import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatWsService } from 'src/app/my-modules/socket-chat/chat-ws.service';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit {

  public groupMessage!: FormGroup;
  constructor(private chat: ChatWsService) { }

  ngOnInit(): void {
    this.createReactiveForm();
  }

  public createReactiveForm(): void {
    this.groupMessage = new FormGroup({
      message: new FormControl('')
    })
  }

  public onSubmit() {
    let { message } = this.groupMessage.value
    if(message.trim().length>0){
      this.chat.getSubject().next(message)
    }
    this.groupMessage.setValue({message:''});
  }

}
