import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.pattern]],
      userPassword: ['', [Validators.required, Validators.pattern, Validators.minLength(6)]]
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
}
