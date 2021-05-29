import { Component, OnInit } from '@angular/core';
import { ChatWsService } from 'src/app/my-modules/socket-chat/chat-ws.service';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.css']
})
export class ChatContentComponent implements OnInit {

  constructor(private chat: ChatWsService) { }

  ngOnInit(): void {
    this.chat.getSubject().subscribe(data=>{
      console.log('DATOS DESDE EL SERVIDOR', data);
      
    })
  }

}
