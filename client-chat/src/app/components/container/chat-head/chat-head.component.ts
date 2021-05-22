import { Component, OnInit } from '@angular/core';
import { ActionNumber } from 'src/app/entities/actionNumberChat';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-chat-head',
  templateUrl: './chat-head.component.html',
  styleUrls: ['./chat-head.component.css']
})
export class ChatHeadComponent implements OnInit {

  usersNumber: number;
  constructor(private state: StateService) {
    this.usersNumber = 0;
  }

  ngOnInit(): void {
    this.state.getNumberSubject().subscribe(data => {
      this.applyOperationInNumber(data)
    })
  }

  applyOperationInNumber(response: ActionNumber) {
    switch (response.type) {
      case 1:
        this.usersNumber =response.value
        break;
      case 2:
        if (this.usersNumber > 0) {
          this.usersNumber = response.value
        }
    }
  }

}
