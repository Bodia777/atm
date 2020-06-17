import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AtmModule } from './modules/atm/atm.module';
import { AdminModule } from './modules/admin/admin.module';
import { WrapperComponent } from './components/common/wrapper/wrapper.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { MaterialAppModule } from './modules/ngmaterial.module';
import { ModalRegistrationComponent } from './components/user-registration/modal-registration/modal-registration.component';
import { ModalTextComponent } from './components/modal-text/modal-text.component';


import { UserModule } from './modules/user/user.module';
import { AppRoutingModule } from './modules/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    WrapperComponent,
    UserRegistrationComponent,
    ModalTextComponent,
    ModalRegistrationComponent
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
    UserModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalTextComponent,
    ModalRegistrationComponent,
  ]
})
export class AppModule { }
