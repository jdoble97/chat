import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'register',
    loadChildren: ()=> import('./my-modules/register/register.module').then(m=> m.RegisterModule)
  },
  {path: 'chat',
    loadChildren: ()=> import('./my-modules/chat/chat.module').then(m=>m.ChatModule)
  },
  {
    path: '', redirectTo: 'register/login', pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
