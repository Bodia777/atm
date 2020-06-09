import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { AtmSoftwareComponent } from '../../components/atm-software/atm-software.component';
import { MaterialAppModule } from '../ngmaterial.module';


@NgModule({
    declarations: [AtmSoftwareComponent],
    imports: [
        AppRoutingModule,
        MaterialAppModule
    ]
})

export class UserModule {

}
