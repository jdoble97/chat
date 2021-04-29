import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Message } from '../entities/message';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private userSubject: Subject<string> = new Subject<string>();
  private numberUsers$: Subject<number> = new Subject<number>();
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
  public emitNumber(numUsers:number):void{
    this.numberUsers$.next(numUsers)
  }

  public getName(): string{
    return this.username.user;
  }
  public getUser(): Message{
    return this.username
  }
}
