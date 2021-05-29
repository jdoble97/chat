import { Injectable } from '@angular/core';
import {WebSocketSubject, webSocket} from 'rxjs/webSocket'
import {endpoint} from 'src/app/class-entity-const/endpoint';
import { Response } from 'src/app/class-entity-const/response';

@Injectable({
  providedIn: 'root'
})
export class ChatWsService {

  private subject$!: WebSocketSubject<Response|string>;
  constructor() { }

  public connect(name: string){
    this.subject$ = webSocket(endpoint.ws)
    this.subject$.next(name)
  }
  public getSubject():WebSocketSubject<any>{
    return this.subject$;
  }
  public sendMsg(value:Response):void{
    this.subject$.next(value)
  }
}
