import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSidenavModule, MatSelectModule],
exports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSidenavModule, MatSelectModule],
providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} }
]
})
export class MaterialAppModule { }
