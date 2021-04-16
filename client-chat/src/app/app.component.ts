import { Component, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Subscription } from 'rxjs';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'client-chat';
  username:string
  subscription:Subscription
  constructor(private userService: StateService){
    this.subscription = this.userService.getSubject().subscribe(value=>{
      this.username = value
      this.cancelSubscription()
    })
  }
  showState(){
    console.log('state user', this.username);
  }
  private cancelSubscription(){
    this.subscription.unsubscribe()
  }
}
