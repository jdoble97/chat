import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LogupComponent } from './components/logup/logup.component';

const routes: Routes = [
    {path: 'login', component:LoginComponent},
    {path: 'logup', component:LogupComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
