import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { MaterialAppModule } from '../ngmaterial.module';
import { AppRoutingModule } from '../app-routing.module';

import { UserAndCardsComponent } from 'src/app/components/user-and-cards/user-and-cards.component';
import { AtmSoftwareComponent } from '../../components/atm-software/atm-software.component';


@NgModule({
    declarations: [
        AtmSoftwareComponent,
        UserAndCardsComponent
    ],
    imports: [
        AppRoutingModule,
        MaterialAppModule
    ],
    providers: [ CookieService ]
})

export class UserModule {

}
