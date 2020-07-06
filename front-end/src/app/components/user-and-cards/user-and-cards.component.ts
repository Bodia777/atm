import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalTextComponent } from '../modal-text/modal-text.component';
import { projectConstants } from 'src/app/constants/constants';
import { CardsService } from 'src/app/services/cards.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    this.openTextModal();
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
    this.cardsService.createCard()
    .pipe(
      takeUntil(this.unsubscribed))
    .subscribe((result) => {
      console.log(result);
    });
  }
}
