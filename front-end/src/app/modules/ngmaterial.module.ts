import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';


@NgModule({
imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSidenavModule],
exports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSidenavModule],
providers: [
    { provide: MatDialogRef, useValue: {} }
]
})
export class MaterialAppModule { }
