import { Message } from '../../../entities/message';
import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { DynamicHostDirective } from 'src/app/directives/dynamic-host.directive';
import { MessagesComponent } from '../messages/messages.component';
import { StateService } from 'src/app/services/state.service';
import { ChatService } from 'src/app/services/chat.service';
import { ResponseType } from 'src/app/entities/ResponseType';
import { ActionNumber} from 'src/app/entities/actionNumberChat'
import { ResponseEnum } from 'src/app/entities/ResponseEnum';

@Component({
  selector: 'app-chat-body',
  templateUrl: './chat-body.component.html',
  styleUrls: ['./chat-body.component.css']
})
export class ChatBodyComponent implements OnInit {

  @ViewChild(DynamicHostDirective) public dynamicHost: DynamicHostDirective;


  constructor(private componentFResolver: ComponentFactoryResolver, private stateChat: StateService, private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.getWS().subscribe(
      msg=>{
        this.createComponent(msg)
        // this.applyActionInResponse(msg)
      },
      err=> console.log('Error recibido', err),
      ()=>console.log('Conexion cerrada')      
    )

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
      let msg = this.stateChat.getUser()
      msg.text = msg_for_sending
      let msg_response: ResponseType = {type: ResponseEnum.send_receive_msg.valueOf(), data: JSON.stringify(msg)}
      console.log(msg_response, 'dddd');
      // this.chatService.sendMessage(msg)
      this.createComponent(msg)
    }
  }

  applyActionInResponse(response:ResponseType):void{
    console.log('TIPO DE RESPUESTA--->', response);
    
    switch(response.type){
      case 1:
        let valueIncrement:number = parseInt(response.data)
        let increment: ActionNumber = {type:1, value: valueIncrement}
        this.stateChat.emitNumber(increment)
        break;
      case 2:
        let valueDecrement:number = parseInt(response.data)
        let decrement: ActionNumber = {type:2, value: valueDecrement}
        this.stateChat.emitNumber(decrement)
        break;
      case 3:
        console.log('TIPO DE RESPUESTA, response', response);
        
        break;
    }
  }
}
