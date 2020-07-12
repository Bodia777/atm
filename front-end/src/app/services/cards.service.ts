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
      {userId: `${this.localStorageService.userId}`, belongingToTheBank: belongingToTheBankResult});
  }

  public getUserCards(): Observable<any> {
    return this.http.get(`${projectConstants.urlCards}?userId=${this.localStorageService.userId}`);
  }
}
