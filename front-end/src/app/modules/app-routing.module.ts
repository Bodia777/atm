import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { UserRegistrationComponent } from '../components/user-registration/user-registration.component';

const routes: Routes = [
    { path: '', redirectTo: 'registration', pathMatch: 'full' },
    { path: 'registration', component: UserRegistrationComponent },
    // { path: 'atm', loadChildren: './atm/atm.module#AtmModule'} - altirnative way for preloading module
    { path: 'atm', loadChildren: () => import('./atm/atm.module').then(m => m.AtmModule)}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
