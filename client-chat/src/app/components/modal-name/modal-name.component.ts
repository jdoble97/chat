import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-modal-name',
  templateUrl: './modal-name.component.html',
  styleUrls: ['./modal-name.component.css']
})
export class ModalNameComponent implements OnInit {
  @ViewChild('getNameSwal')
  public readonly mySwal: SwalComponent
  private subscription_chat: Subscription
  constructor(private userService: StateService, private chatService: ChatService) { }

  ngOnInit(): void {
    // this.subscription_chat = this.chatService.getWS().subscribe(
    //   msg=>{
    //     console.log(msg)
    //     this.closeSubscription()
    //   },
    //   err=>console.log(err),
    //   ()=>console.log('Conexion cerrada')
    // )
  }

  public showModal(): void {
    this.mySwal.fire()
      .then(values => {
        const { isConfirmed, value } = values
        if (isConfirmed && value.length > 0) {
          this.setName(value)
        }
      })
  }
  public setName(name:string):void{
    this.userService.emitUser(name)
    this.chatService.sendMessage(this.userService.getUser())
  }

  // public closeSubscription(){
  //   this.subscription_chat.unsubscribe()
  // }
}
