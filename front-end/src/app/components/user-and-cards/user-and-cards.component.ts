import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalTextComponent } from '../modal-text/modal-text.component';
import { projectConstants } from 'src/app/constants/constants';
import { CardsService } from 'src/app/services/cards.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Card } from 'src/app/interfaces/card';

@Component({
  selector: 'app-user-and-cards',
  templateUrl: './user-and-cards.component.html',
  styleUrls: ['./user-and-cards.component.scss']
})
export class UserAndCardsComponent implements OnInit, OnDestroy {
  public cardsArr = [];
  private unsubscribed = new Subject();
  private unsubscribed2 = new Subject();

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef < ModalTextComponent >, private cardsService: CardsService) { }

  ngOnInit(): void {
    this.cardsService.getUserCards()
    .pipe(takeUntil(this.unsubscribed2))
    .subscribe((result: [Card]) => {
      this.cardsArr = result;
    });
    this.openTextModal();
  }

  ngOnDestroy(): void {
    this.unsubscribed.next();
    this.unsubscribed.complete();
    this.unsubscribed2.next();
    this.unsubscribed2.complete();
  }

  private openTextModal(): void {
    this.dialog.open(ModalTextComponent, {
      width: '300px',
      data: {
        modalText: projectConstants.moalTextWithExplanationsCardCreationsNeeds,
        cancelButtonChecker: false,
        confirmButtonChecker: true,
        textOfTheFirstButton: 'OK',
        textOfTheSecondButton: '',
      }
    });
  }

  addCard() {
    const addCarddialog = this.dialog.open(ModalTextComponent, {
      disableClose: true,
      width: '300px',
      data: {
        modalText: projectConstants.modalTextToDetermineAffiliationToTheBank,
        cancelButtonChecker: true,
        confirmButtonChecker: true,
        textOfTheFirstButton: 'YES',
        textOfTheSecondButton: 'NO',
      }
    });
    addCarddialog.afterClosed().subscribe(data => {
      let belongingToTheBankResult = null;
      if (data) {
        belongingToTheBankResult = 0;
      } else {
        belongingToTheBankResult = 1;
      }
      this.cardsService.createCard(belongingToTheBankResult)
      .pipe(
        takeUntil(this.unsubscribed))
        .subscribe((result) => {
          this.cardsArr.push(result);
        });
      });
  }
}
