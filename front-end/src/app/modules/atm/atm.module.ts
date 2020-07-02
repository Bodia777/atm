import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AtmSoftwareComponent } from 'src/app/components/atm-software/atm-software.component';
import { AuthGuard } from 'src/app/guard/auth-guard.guard';
import { UserAndCardsComponent } from 'src/app/components/user-and-cards/user-and-cards.component';
import { WrapperComponent } from 'src/app/components/common/wrapper/wrapper.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
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
  ]
})
export class AtmModule { }
