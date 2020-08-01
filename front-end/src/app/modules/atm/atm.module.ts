import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AtmSoftwareComponent } from 'src/app/components/atm-software/atm-software.component';
import { UserAndCardsComponent } from 'src/app/components/user-and-cards/user-and-cards.component';
import { WrapperComponent } from 'src/app/components/common/wrapper/wrapper.component';
import { CardDetailsComponent } from 'src/app/components/user-and-cards/card-details/card-details.component';
import { AuthGuard } from 'src/app/guard/auth-guard.guard';



@NgModule({
  declarations: [
    CardDetailsComponent,
    AtmSoftwareComponent,
    UserAndCardsComponent,
    WrapperComponent
                ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: AtmSoftwareComponent,
     canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'cards', pathMatch: 'full' },
      { path: 'cards', component: UserAndCardsComponent },
      { path: 'atm-software', component: WrapperComponent }
      ]
    },
    ])
  ],
  exports: []
})
export class AtmModule { }
