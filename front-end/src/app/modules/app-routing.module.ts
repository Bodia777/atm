import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRegistrationComponent } from '../components/user-registration/user-registration.component';

const routes: Routes = [
    { path: '', redirectTo: 'registration', pathMatch: 'full' },
    { path: 'registration', component: UserRegistrationComponent },
//     { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
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
