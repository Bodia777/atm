import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { AtmSoftwareComponent } from '../../components/atm-software/atm-software.component';
import { MaterialAppModule } from '../ngmaterial.module';
import { UserAndCardsComponent } from 'src/app/components/user-and-cards/user-and-cards.component';


@NgModule({
    declarations: [
        AtmSoftwareComponent,
        UserAndCardsComponent
    ],
    imports: [
        AppRoutingModule,
        MaterialAppModule
    ]
})

export class UserModule {

}
