import { Component, OnInit, Input } from '@angular/core';
import { ModalTextComponent } from 'src/app/components/modal-text/modal-text.component';
import { Card } from 'src/app/interfaces/card';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CardsService } from 'src/app/services/cards.service';
import { projectConstants } from 'src/app/constants/constants';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {
  @Input() detailsItem: Card;
  @Input() itemIndex: number;
  public cardColor: string;

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef < ModalTextComponent >, private cardsService: CardsService) { }

  ngOnInit(): void {
  if (!this.detailsItem.belonging_to_The_Bank) {
    this.cardColor = 'white';
  } else {
    this.cardColor = 'darkred';
  }
  }
  public deleteCard(): void {
    this.openTextModal();
  }

  private openTextModal(): void {
    const deleteCardDialog = this.dialog.open(ModalTextComponent, {
      width: '300px',
      data: {
        modalText: projectConstants.modalTextDeleteCardSubmit,
        cancelButtonChecker: true,
        confirmButtonChecker: true,
        textOfTheFirstButton: 'No',
        textOfTheSecondButton: 'Yes',
      }
    });
    deleteCardDialog.afterClosed().subscribe(data => {
      if (data) {
        this.cardsService.deleteCard(this.detailsItem.card_number);
      }
    });
  }

}
