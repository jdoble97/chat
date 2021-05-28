import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit {

  public groupMessage!: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.createReactiveForm();
  }

  public createReactiveForm(): void{
    this.groupMessage = new FormGroup({
      message: new FormControl(''),
      messages: new FormControl(''),
    })
  }

  public onSubmit(){
    console.log('Contenido del mensaje', this.groupMessage.value);
    
  }
}
