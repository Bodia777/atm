import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
// import { MatSidenav } from '@angular/material/s;idenav';

@Component({
  selector: 'app-atm-software',
  templateUrl: './atm-software.component.html',
  styleUrls: ['./atm-software.component.scss']
})
export class AtmSoftwareComponent implements OnInit {
  disableSelect = new FormControl(false);

  // @ViewChild('drawer') public sidenav: MatSidenav; - I can change sidenaw using TS

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  public logOut(): void {
    this.localStorageService.logOut();
  }

}
