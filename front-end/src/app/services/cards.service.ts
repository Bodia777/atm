import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { projectConstants } from '../constants/constants';
import { Observable } from 'rxjs';
import { Card } from '../interfaces/card';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private localStorageService: LocalStorageService, private http: HttpClient) { }

  public createCard(belongingToTheBankResult): Observable<any> {
    return this.http.post(projectConstants.urlCards,
      {user_ID: `${this.localStorageService.userId}`, belonging_to_The_Bank: belongingToTheBankResult});
  }

  public getUserCards(): Observable<any> {
    return this.http.get(`${projectConstants.urlCards}?userId=${this.localStorageService.userId}`);
  }

  public deleteCard(cardNumber): void {
    console.log('uurraa');
  }
}
