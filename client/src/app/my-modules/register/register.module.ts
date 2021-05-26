import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { LogupComponent } from './components/logup/logup.component';
import { RegisterRoutingModule } from './register-routing.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UserStateService } from '../socket-chat/user-state.service';



@NgModule({
  declarations: [
    LoginComponent,
    LogupComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SweetAlert2Module.forRoot()
  ],
  providers:[
    UserStateService
  ]
})
export class RegisterModule { }
