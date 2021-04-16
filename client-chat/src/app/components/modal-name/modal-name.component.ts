import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-modal-name',
  templateUrl: './modal-name.component.html',
  styleUrls: ['./modal-name.component.css']
})
export class ModalNameComponent implements OnInit {
  @ViewChild('getNameSwal')
  public readonly mySwal: SwalComponent
  constructor(private userService: StateService) { }

  ngOnInit(): void {
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
  }
}
