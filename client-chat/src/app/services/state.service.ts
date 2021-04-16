import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private userSubject: Subject<string> = new Subject<string>();
  private numberUsers$: Subject<number> = new Subject<number>();
  private username: string
  constructor() { }

  public emitUser(name:string):void{
    this.username = name
    this.userSubject.next(name);
  }
  public getSubject():Subject<string>{
    return this.userSubject
  }
  ///////////////////
  public emitNumber(numUsers:number):void{
    this.numberUsers$.next(numUsers)
  }
}
