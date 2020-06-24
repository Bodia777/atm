import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthCRUDServiceService } from '../services/auth-crudservice.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthCRUDServiceService, private localStorageService: LocalStorageService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.localStorageService.tokenAgeChecker());
      if (this.localStorageService.tokenAgeChecker()) {
        return true;
      }
      else {
        return false;
      }
    }
}
