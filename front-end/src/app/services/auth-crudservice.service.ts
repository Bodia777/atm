import { Injectable, Inject, OnDestroy } from '@angular/core';
import { User } from '../interfaces/userAuthInterface';
import { HttpClient } from '@angular/common/http';
import { catchError, takeUntil } from 'rxjs/operators';
import { throwError, Observable, Subject } from 'rxjs';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalTextComponent } from '../components/modal-text/modal-text.component';

@Injectable({
  providedIn: 'root'
})
export class AuthCRUDServiceService implements OnDestroy {
  private urlAuth = 'http://localhost:3000/auth';
  private unsubscribed = new Subject();

  constructor(private http: HttpClient, public dialogRef: MatDialogRef < ModalTextComponent >,
              @Inject (MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) { }


  ngOnDestroy(): void {
  this.unsubscribed.next();
  this.unsubscribed.complete();
  }

 public postUser(user: User) {
   this.http.post(this.urlAuth, user)
  .pipe(takeUntil(this.unsubscribed))
  .pipe(catchError((err) => {
    console.log(err);

    this.dialog.open(ModalTextComponent, {
      disableClose: true,
      width: '80vw',
      data: {
        modalText: err.error.message,
        cancelButtonChecker: false,
        confirmButtonChecker: true,
        textOfTheFirstButton: 'ok',
      textOfTheSecondButton: '',
      }
    });
    return throwError(err);
  }))
  .subscribe((result) => {
    this.dialog.open(ModalTextComponent, {
      disableClose: true,
      width: '80vw',
      height: '30vh',
      data: {
        modalText: 'You have to open the automatically generated letter from this site in your email. And you have to follow the link provided there to confirm the registration',
      cancelButtonChecker: false,
      confirmButtonChecker: true,
      textOfTheFirstButton: 'ok',
      textOfTheSecondButton: '',
     }
   });
  });
  }
}
