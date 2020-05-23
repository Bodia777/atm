import {
  Component,
  OnInit
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';
import {
  ModalComponent
} from '../modal/modal.component';
import { ModalRegistrationComponent } from '../modal-registration/modal-registration.component';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  private modalText = 'This site is used to simulate ATM software. For the site to work properly, you have to register yourself or to log in. You have to create a virtual card for ATM transactions.';

  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef < ModalComponent > ) {}

  ngOnInit(): void {
    this.dialog.open(ModalComponent, {
      width: '300px',
      data: {
        modalText: this.modalText,
        cancelButtoChecker: false,
        textOfTheFirstButton: 'OK'
      }
    });
  }

  public openModalForFacebookAutentification(){
    this.dialog.open(ModalComponent, {
      width: '300px',
      data: {
        modalText: '',
        cancelButtoChecker: false,
        textOfTheFirstButton: 'OK'
      }
    });
  }

  public registrationFunc() {
    this.dialog.open(ModalRegistrationComponent, {
      width: '100vw',
      data: {      }
    });
  }
}
