import { Injectable } from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket'
import {URL} from '../entities/URL';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  $my_ws: WebSocketSubject<any> = webSocket(URL.url_ws)

  constructor() { }
}
