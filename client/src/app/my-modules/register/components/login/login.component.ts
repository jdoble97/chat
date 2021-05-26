import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { UserStateService } from 'src/app/my-modules/socket-chat/user-state.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginSwal')
  public readonly loginSwal!: SwalComponent;
  constructor(private state: UserStateService, private router: Router) { }

  ngOnInit(): void {
  }

  public launchLogin(): void {
    console.log('Login');
    this.loginSwal.fire()
      .then(values => {
        console.log(values);
        if (values.isConfirmed && values.value.length > 1) {
          this.state.setName(values.value)
          this.router.navigate(['chat'])
        }
      })
  }
}
