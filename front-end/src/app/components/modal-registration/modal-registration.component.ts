import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  Inject
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalTextComponent } from '../modal-text/modal-text.component';

@Component({
  selector: 'app-modal-registration',
  templateUrl: './modal-registration.component.html',
  styleUrls: ['./modal-registration.component.scss']
})
export class ModalRegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  public regExpForEmail = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z]{2,4})$/i;
  public regExpPassSpace = /[\s]/;
  public regExpPassUpperCase = /([A-Z])/;
  public regExpPassLowerCase = /([a-z])/;
  public regExpPassSpecSymbol = /[\W]/;
  public regExpPassNumber = /([0-9])/;
  @ViewChild('itemPasswordVisibility', { static: false }) itemPasswordVisibility: ElementRef;
  @ViewChild('itemConfirmPasswordVisibility', { static: false }) itemConfirmPasswordVisibility: ElementRef;

  constructor(private fb: FormBuilder, private renderer: Renderer2, public dialogRef2: MatDialogRef < ModalRegistrationComponent >,
              public dialogRef: MatDialogRef < ModalTextComponent >, private dialog: MatDialog,
              @Inject (MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.pattern]],
      userPassword: ['', [Validators.required, Validators.pattern, Validators.minLength(6)]],
      userRepeatPassword: ['', [Validators.required]]
    });
  }

  public getEmailErrorMessage() {
    if (this.registrationForm.controls.userEmail.hasError('required')) {
      return 'You must enter a value';
    }

    return this.registrationForm.controls.userEmail.hasError('pattern') ? 'Not a valid email' : '';
  }
  public getPasswordErrorMessage(): string | any {
    if (this.registrationForm.controls.userPassword.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.registrationForm.controls.userPassword.value.length < 6) {
      return 'password to short';
    }
    if (!this.registrationForm.controls.userPassword.value.match(this.regExpPassLowerCase)) {
      return 'password should have LowerCase letter';
    }
    if (!this.registrationForm.controls.userPassword.value.match(this.regExpPassUpperCase)) {
      return 'password should have UpperCase letter';
    }
    if (!this.registrationForm.controls.userPassword.value.match(this.regExpPassNumber)) {
      return 'password should have a number';
    }
    if (!this.registrationForm.controls.userPassword.value.match(this.regExpPassSpecSymbol)) {
      return 'password should have special symbol';
    }
    if (this.registrationForm.controls.userPassword.value.match(this.regExpPassSpace)) {
      this.registrationForm.controls.userPassword.setErrors({});
      return 'password shouldn\'t have space';
    }
    return '';
  }

  public repeatPasswordErrorMessage(): string {
    if (this.registrationForm.controls.userRepeatPassword.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.registrationForm.controls.userRepeatPassword.value !== this.registrationForm.controls.userPassword.value) {
      this.registrationForm.controls.userRepeatPassword.setErrors({});
      return 'passwords don\'t match';
    }
    return '';
  }

  public showPassword(element): void {
    if (element === 'itemPassword' && this.registrationForm.controls.userPassword.value) {
      this.renderer.setAttribute(this.itemPasswordVisibility.nativeElement, 'type', 'text');
    } else if (element === 'itemConfirmPassword' && this.registrationForm.controls.userRepeatPassword.value) {
      this.renderer.setAttribute(this.itemConfirmPasswordVisibility.nativeElement, 'type', 'text');
    }
  }

  public hidePassword(element): void {
    if (element === 'itemPassword') {
      this.renderer.setAttribute(this.itemPasswordVisibility.nativeElement, 'type', 'password');
    } else if (element === 'itemConfirmPassword') {
      this.renderer.setAttribute(this.itemConfirmPasswordVisibility.nativeElement, 'type', 'password');
    }
  }

  public createUser(): void {
    const infoDialog = this.dialog.open(ModalTextComponent, {
      disableClose: true,
      width: '80vw',
      height: '30vh',
      data: {
        modalText: 'You have to open the automatically generated letter from this sitein your email. And you have to follow the link provided there to confirm the registration',
        cancelButtonChecker: false,
        confirmButtonChecker: true,
        textOfTheFirstButton: 'ok',
        textOfTheSecondButton: '',
      }
    });
    infoDialog.afterClosed().subscribe(result => {
      this.closeModal();
    });
  }

  public loginUser(): void {
    console.log('login');

  }

  public closeModal(): void {
    this.dialogRef2.close();
  }
}
