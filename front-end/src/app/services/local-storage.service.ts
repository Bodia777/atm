import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthCRUDServiceService } from './auth-crudservice.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements OnDestroy {
  private timeOutTokenAge: any;

  constructor(private router: Router, private authCrudService: AuthCRUDServiceService) {
    if (this.tokenDate) {
      // const tokenAgeHandler = new Date() - new Date(this.tokenDate);
      // console.log(tokenAgeHandler, '??????????????????');
    }

   }

  ngOnDestroy(): void {
    clearTimeout(this.timeOutTokenAge);
  }

  public get tokenDate(): string {
    return localStorage.getItem('tokenDate');
  }

  public setTokenDate(tokenAge, tokenDate) {
    localStorage.setItem('tokenDate', tokenDate.toString());
    this.timeOutTokenAge = setTimeout(() => {
      this.tokenAgeChecker();
      clearTimeout(this.timeOutTokenAge);
    }, tokenAge + 1);
  }

  public tokenAgeChecker(): boolean {
    const loginDate = new Date(this.tokenDate);

    if (loginDate < new Date()) {
        this.logOut();
        return false;
    }
    if (loginDate > new Date()) {
      return true;
    } else {
      return false;
    }
  }

  public logOut(): void {
    localStorage.clear();
    this.router.navigateByUrl('/registration?signIn=true');
  }

}
