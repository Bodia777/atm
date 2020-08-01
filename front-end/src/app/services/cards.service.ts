import { Injectable, OnDestroy } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { projectConstants } from '../constants/constants';
import { BehaviorSubject, Subject } from 'rxjs';
import { Card } from '../interfaces/card';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardsService implements OnDestroy {
  public cardsArr$ = new BehaviorSubject<[Card] | []>([]);
  private unsubscribed = new Subject();

  constructor(private localStorageService: LocalStorageService, private http: HttpClient) {
    this.getUserCards();
   }
   ngOnDestroy() {
    this.unsubscribed.next();
    this.unsubscribed.complete();
   }

  public createCard(belongingToTheBankResult): void {
    this.http.post(projectConstants.urlCards,
      {user_ID: `${this.localStorageService.userId}`, belonging_to_The_Bank: belongingToTheBankResult})
      .pipe(takeUntil(this.unsubscribed))
      .subscribe(() => {
        this.getUserCards();
      });
  }

  private getUserCards(): void {
   this.http.get(`${projectConstants.urlCards}?userId=${this.localStorageService.userId}`)
   .pipe(takeUntil(this.unsubscribed))
   .subscribe((cardsArr: [Card]) => {
     this.cardsArr$.next(cardsArr);
   });
  }

  public deleteCard(cardNumber): void {
    this.http.delete(`${projectConstants.urlCards}?card_number=${cardNumber}`)
    .pipe(takeUntil(this.unsubscribed))
    .subscribe(() => {
      this.getUserCards();
    });
  }
}
