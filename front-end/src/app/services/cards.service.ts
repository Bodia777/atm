import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { projectConstants } from '../constants/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private localStorageService: LocalStorageService, private http: HttpClient) { }

  public createCard(): Observable<any> {
    console.log(this.localStorageService.userId, 'this.localStorageService.userId');
    return this.http.post(projectConstants.urlCards, {userId: `${this.localStorageService.userId}`});
  }
}
