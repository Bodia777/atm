import { Component, OnInit, ViewChild, ElementRef, Renderer2, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalTextComponent } from 'src/app/components/modal-text/modal-text.component';
import { AuthCRUDServiceService } from 'src/app/services/auth-crudservice.service';


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
              public dialogRef: MatDialogRef < ModalTextComponent >, private dialog: MatDialog, private authService: AuthCRUDServiceService,
              @Inject (MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.pattern]],
      userPassword: ['', [Validators.required, Validators.pattern, Validators.minLength(6)]],
      userConfirmPassword: ['', [Validators.required]],
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
      this.registrationForm.controls.userPassword.setErrors({});
      return 'password should have LowerCase letter';
    }
    if (!this.registrationForm.controls.userPassword.value.match(this.regExpPassUpperCase)) {
      this.registrationForm.controls.userPassword.setErrors({});
      return 'password should have UpperCase letter';
    }
    if (!this.registrationForm.controls.userPassword.value.match(this.regExpPassNumber)) {
      this.registrationForm.controls.userPassword.setErrors({});
      return 'password should have a number';
    }
    if (!this.registrationForm.controls.userPassword.value.match(this.regExpPassSpecSymbol)) {
      this.registrationForm.controls.userPassword.setErrors({});
      return 'password should have special symbol';
    }
    if (this.registrationForm.controls.userPassword.value.match(this.regExpPassSpace)) {
      this.registrationForm.controls.userPassword.setErrors({});
      return 'password shouldn\'t have space';
    }
    return '';
  }

  public repeatPasswordErrorMessage(): string {
    if (this.registrationForm.controls.userConfirmPassword.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.registrationForm.controls.userConfirmPassword.value !== this.registrationForm.controls.userPassword.value) {
      this.registrationForm.controls.userConfirmPassword.setErrors({});
      return 'passwords don\'t match';
    }
    return '';
  }

  public showPassword(element): void {
    if (element === 'itemPassword' && this.registrationForm.controls.userPassword.value) {
      this.renderer.setAttribute(this.itemPasswordVisibility.nativeElement, 'type', 'text');
    } else if (element === 'itemConfirmPassword' && this.registrationForm.controls.userConfirmPassword.value) {
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
    this.registrationForm.controls.userConfirmPassword.setValue(0);
    this.authService.postUser(this.registrationForm.value);
    this.registrationForm.reset();
  }

  public loginUser(): void {
    this.authService.loginUser({ userEmail: this.registrationForm.controls.userEmail.value,
       userPassword: this.registrationForm.controls.userPassword.value });
  }

  public closeModal(): void {
    this.dialogRef2.close();
  }
}
