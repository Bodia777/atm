import { Injectable, Inject, OnDestroy } from '@angular/core';
import { User } from '../interfaces/userAuthInterface';
import { HttpClient } from '@angular/common/http';
import { catchError, takeUntil } from 'rxjs/operators';
import { throwError, Observable, Subject } from 'rxjs';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalTextComponent } from '../components/modal-text/modal-text.component';
import {projectConstants} from '../constants/constants';
@Injectable({
  providedIn: 'root'
})
export class AuthCRUDServiceService implements OnDestroy {
  private unsubscribed = new Subject();


  constructor(private http: HttpClient, public dialogRef: MatDialogRef < ModalTextComponent >,
              @Inject (MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) { }


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
    this.http.patch(projectConstants.urlLogin, user)
    .pipe(takeUntil(this.unsubscribed))
    .pipe(catchError((err) => {
      this.openModalWindow(err.error.message);
      return throwError(err);
    }))
    .subscribe((result) => {
      console.log(result);
    });
  }


  private openModalWindow(text): void {
    this.dialog.open(ModalTextComponent, {
      disableClose: true,
      width: '80vw',
      height: '30vh',
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
