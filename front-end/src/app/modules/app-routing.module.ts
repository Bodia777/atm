import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRegistrationComponent } from '../components/user-registration/user-registration.component';
import { AtmSoftwareComponent } from '../components/atm-software/atm-software.component';
import { AuthGuard } from '../guard/auth-guard.guard';
import { UserAndCardsComponent } from '../components/user-and-cards/user-and-cards.component';
import { WrapperComponent } from '../components/common/wrapper/wrapper.component';

const routes: Routes = [
    { path: '', redirectTo: 'registration', pathMatch: 'full' },
    { path: 'registration', component: UserRegistrationComponent },
    { path: 'atm', component: AtmSoftwareComponent,
    //  canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'cards', pathMatch: 'full' },
      { path: 'cards', component: UserAndCardsComponent },
      { path: 'atm-software', component: WrapperComponent }
      ]
    },
//     { path: 'news', component: NewsRouterComponent,
//      canActivate: [AuthGuard],
//     children: [
//       { path: '', component: NewsComponent },
//       { path: 'details/:id', component: ItemDetailsComponent}
//     ]
//   },
//     { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
//     { path: '**', component: PageNotFoundComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
