import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActionNumber } from '../entities/actionNumberChat';
import { Message } from '../entities/message';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private userSubject: Subject<string> = new Subject<string>();
  private numberUsers$: Subject<ActionNumber> = new Subject<ActionNumber>();
  private username: Message
  constructor() { }

  public emitUser(name:string):void{
    this.username = {user: name}
    this.userSubject.next(name);
  }
  public getSubject():Subject<string>{
    return this.userSubject
  }
  ///////////////////
  public emitNumber(numUsers:ActionNumber):void{
    this.numberUsers$.next(numUsers)
  }

  public getName(): string{
    return this.username.user;
  }
  public getUser(): Message{
    return this.username
  }
  ///////
  public getNumberSubject(): Subject<ActionNumber>{
    return this.numberUsers$;
  }
}
