import { Message } from '../../../entities/message';
import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { DynamicHostDirective } from 'src/app/directives/dynamic-host.directive';
import { MessagesComponent } from '../messages/messages.component';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-chat-body',
  templateUrl: './chat-body.component.html',
  styleUrls: ['./chat-body.component.css']
})
export class ChatBodyComponent implements OnInit {

  @ViewChild(DynamicHostDirective) public dynamicHost: DynamicHostDirective;

  constructor(private componentFResolver: ComponentFactoryResolver, private stateChat: StateService) { }

  ngOnInit(): void {
  }

  public createComponent(msg: Message): void {
    const component = this.componentFResolver.resolveComponentFactory(MessagesComponent);
    // this.dynamicHost.vcr.clear() esto elimina el componente previo que se haya creado para crear uno nuevo
    //Dado que es un chat los mensajes que tengo no los voy a eliminar
    let dynamicComponent = this.dynamicHost.vcr.createComponent(component).instance;
    dynamicComponent.msg = msg
    dynamicComponent.selfUser = true
  }

  public sendMessage(e): void{
    e.preventDefault()
    let msg_for_sending: string = e.target.msg.value
    e.target.msg.value = ""
    if(msg_for_sending.length>0){
      //user: this.stateChat.getName(),
      let msg: Message = { user: 'PRUEBA', text:msg_for_sending}
      this.createComponent(msg)
    }
  }
}
