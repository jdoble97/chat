import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ModalNameComponent } from './components/modal-name/modal-name.component';
import { StateService } from './services/state.service';
import { ContainerChatComponent } from './components/container-chat/container-chat.component';
import { ChatHeadComponent } from './components/container/chat-head/chat-head.component';
import { ChatBodyComponent } from './components/container/chat-body/chat-body.component';
import { MessagesComponent } from './components/container/messages/messages.component';
import { DynamicHostDirective } from './directives/dynamic-host.directive';

@NgModule({
  declarations: [
    AppComponent,
    ModalNameComponent,
    ContainerChatComponent,
    ChatHeadComponent,
    ChatBodyComponent,
    MessagesComponent,
    DynamicHostDirective
  ],
  imports: [
    BrowserModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [StateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
