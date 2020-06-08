import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalRegistrationComponent } from '../modal-registration/modal-registration.component';
import { ModalTextComponent } from '../modal-text/modal-text.component';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit, OnDestroy {
  private modalText = 'This site is used to simulate ATM software. For the site to work properly, you have to register yourself or to log in. You have to create a virtual card for ATM transactions.';
  private routerSubscription: Subscription;


  constructor(public dialog: MatDialog, private activatedRoute: ActivatedRoute,
              public dialogRef: MatDialogRef < ModalTextComponent > ) {}

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.routerSubscription = combineLatest(
      this.activatedRoute.queryParams
    ).subscribe(([query]) => {
      if (!Object.entries(query).length) {
        this.openTextModal();
      } else if (query.signIn === 'true') {
        this.loginFunc();
      } else {
        this.openTextModal();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }



  public openModalForFacebookAutentification(){
    this.dialog.open(ModalTextComponent, {
      width: '300px',
      data: {
        modalText: '',
        cancelButtonChecker: false,
        confirmButtonChecker: true,
        textOfTheFirstButton: 'OK',
        textOfTheSecondButton: '',
      }
    });
  }

  public registrationFunc() {
    this.dialog.open(ModalRegistrationComponent, {
      width: this.setModalRegistrationComponentWidth(),
      data: { modalStatus: 'registrationStatus' }
    });
  }

  public loginFunc() {
    this.dialog.open(ModalRegistrationComponent, {
      width: this.setModalRegistrationComponentWidth(),
      data: { modalStatus: 'loginStatus' }
    });
  }

  private setModalRegistrationComponentWidth(): string {
    if (window.innerWidth > 490) {
      return '60vw';
    } else {
      return '90vw';
    }
  }

  private openTextModal(): void {
    this.dialog.open(ModalTextComponent, {
      width: '300px',
      data: {
        modalText: this.modalText,
        cancelButtonChecker: false,
        confirmButtonChecker: true,
        textOfTheFirstButton: 'OK',
        textOfTheSecondButton: '',
      }
    });
  }
}
