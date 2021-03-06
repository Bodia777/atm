import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { AppComponent } from './app.component';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AdminModule } from './modules/admin/admin.module';
import { AppRoutingModule } from './modules/app-routing.module';
import { MaterialAppModule } from './modules/ngmaterial.module';

import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { ModalRegistrationComponent } from './components/user-registration/modal-registration/modal-registration.component';
import { ModalTextComponent } from './components/modal-text/modal-text.component';

import { ResponseTokenInterceptor } from './interceptors/response-token.interceptor';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ResponseTokenInterceptor,
  multi: true
};


@NgModule({
  declarations: [
    AppComponent,
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
    AdminModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialAppModule
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalTextComponent,
    ModalRegistrationComponent,
  ]
})
export class AppModule { }
