import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  private name!: string;

  constructor() { }

  public setName(name: string): void{
    this.name = name;
  }
}
