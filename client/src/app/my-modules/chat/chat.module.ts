import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './components/chat/chat.component';
import { ChatMessagesComponent } from './components/chat-messages/chat-messages.component';
import { ChatContentComponent } from './components/chat-content/chat-content.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChatComponent,
    ChatMessagesComponent,
    ChatContentComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    ReactiveFormsModule
  ]
})
export class ChatModule { }
