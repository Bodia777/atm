import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { MaterialAppModule } from '../ngmaterial.module';
import { AppRoutingModule } from '../app-routing.module';

import { UserAndCardsComponent } from 'src/app/components/user-and-cards/user-and-cards.component';
import { AtmSoftwareComponent } from '../../components/atm-software/atm-software.component';
import { CardDetailsComponent } from 'src/app/components/card-details/card-details.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        AtmSoftwareComponent,
        UserAndCardsComponent,
        CardDetailsComponent
    ],
    imports: [
        AppRoutingModule,
        MaterialAppModule,
        SharedModule
    ],
    exports: [SharedModule],
    providers: [ CookieService ]
})

export class UserModule {

}
