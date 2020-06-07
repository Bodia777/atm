import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AtmModule } from './modules/atm/atm.module';
import { AdminModule } from './modules/admin/admin.module';
import { WrapperComponent } from './components/common/wrapper/wrapper.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { MaterialAppModule } from './modules/ngmaterial.module';
import { ModalRegistrationComponent } from './components/modal-registration/modal-registration.component';
import { ModalTextComponent } from './components/modal-text/modal-text.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    WrapperComponent,
    UserRegistrationComponent,
    ModalTextComponent,
    ModalRegistrationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    AtmModule,
    AdminModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialAppModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalTextComponent,
    ModalRegistrationComponent,
  ]
})
export class AppModule { }
