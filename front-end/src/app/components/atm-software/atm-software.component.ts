import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
// import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-atm-software',
  templateUrl: './atm-software.component.html',
  styleUrls: ['./atm-software.component.scss']
})
export class AtmSoftwareComponent implements OnInit {
  disableSelect = new FormControl(false);

  // @ViewChild('drawer') public sidenav: MatSidenav; - I can change sidenaw using TS

  constructor() { }

  ngOnInit(): void {
  }

}
