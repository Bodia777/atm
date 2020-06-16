import { Injectable, Inject, OnDestroy } from '@angular/core';
import { User } from '../interfaces/userAuthInterface';
import { HttpClient } from '@angular/common/http';
import { catchError, takeUntil } from 'rxjs/operators';
import { throwError, Observable, Subject } from 'rxjs';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalTextComponent } from '../components/modal-text/modal-text.component';
import {projectConstants} from '../constants/constants';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthCRUDServiceService implements OnDestroy {
  public loginUserChecker = false;
  private unsubscribed = new Subject();


  constructor(private http: HttpClient, public dialogRef: MatDialogRef < ModalTextComponent >,
              @Inject (MAT_DIALOG_DATA) public data: any, private dialog: MatDialog,
              private router: Router) { }


  ngOnDestroy(): void {
  this.unsubscribed.next();
  this.unsubscribed.complete();
  }

 public postUser(user: User) {
   this.http.post(projectConstants.urlAuth, user)
  .pipe(takeUntil(this.unsubscribed))
  .pipe(catchError((err) => {
    this.openModalWindow(err.error.message);
    return throwError(err);
  }))
  .subscribe((result) => {
    this.openModalWindow(projectConstants.modalTextToConfirmRegistration);
  });
  }

  public loginUser(user: User) {
    this.http.post(projectConstants.urlLogin, user)
    .pipe(takeUntil(this.unsubscribed))
    .pipe(catchError((err) => {
      this.openModalWindow(err.error);
      return throwError(err);
    }))
    .subscribe((result) => {
      if (result === 'login confirmed') { this.loginUserChecker = true; }
      this.router.navigate(['atm']);
    });
  }


  private openModalWindow(text): void {
    this.dialog.open(ModalTextComponent, {
      disableClose: true,
      width: '80vw',
      data: {
        modalText: text,
      cancelButtonChecker: false,
      confirmButtonChecker: true,
      textOfTheFirstButton: 'ok',
      textOfTheSecondButton: '',
     }
   });
  }
}
