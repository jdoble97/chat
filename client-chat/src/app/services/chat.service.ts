import { Injectable } from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket'
import { Message } from '../entities/message';
import {URL} from '../entities/URL';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  my_ws$: WebSocketSubject<any> = webSocket(URL.url_ws)

  constructor() { }

  public getWS(){
    return this.my_ws$;
  }
  public sendMessage(msg: Message):void{
    this.my_ws$.next(msg)
  }
}
