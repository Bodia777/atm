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

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef < ModalTextComponent >, private cardsService: CardsService) { }

  ngOnInit(): void {
    this.cardsService.cardsArr$
    .pipe(takeUntil(this.unsubscribed))
    .subscribe((result: [Card]) => {
      this.cardsArr = result;
      if (!result.length){
        this.openTextModal();
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribed.next();
    this.unsubscribed.complete();
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
    if (this.cardsArr.length < 5) {
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
    addCarddialog.afterClosed().subscribe( async (data) => {
      let belongingToTheBankResult = null;
      if (data) {
        belongingToTheBankResult = 0;
      } else {
        belongingToTheBankResult = 1;
      }
      this.cardsService.createCard(belongingToTheBankResult);
    });
   } else {
    this.dialog.open(ModalTextComponent, {
      disableClose: true,
      width: '300px',
      data: {
        modalText: projectConstants.maxCardsCountInfo,
        cancelButtonChecker: true,
        confirmButtonChecker: false,
        textOfTheFirstButton: '',
        textOfTheSecondButton: 'OK',
      }
    });
  }
}
}
