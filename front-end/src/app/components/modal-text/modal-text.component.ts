import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-text',
  templateUrl: './modal-text.component.html',
  styleUrls: ['./modal-text.component.scss']
})
export class ModalTextComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalTextComponent>,
              @Inject (MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {}

  public closeModal(): void {
    this.dialogRef.close();
  }
}
