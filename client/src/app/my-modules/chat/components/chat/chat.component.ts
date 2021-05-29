import { Component, OnInit } from '@angular/core';
import { ChatWsService } from 'src/app/my-modules/socket-chat/chat-ws.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public numberUser: number;
  constructor(private chat: ChatWsService) { 
    this.numberUser = 0;
  }

  ngOnInit(): void {
    this.chat.getSubject().subscribe(data=>{
      let {type}= data
      if(type==1 || type==2){
        this.numberUser = data['data']['number_of_clients']
      }
    })
  }

}
