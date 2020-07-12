import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialAppModule } from '../ngmaterial.module';


@NgModule({
    declarations: [],
    imports: [CommonModule, MaterialAppModule],
    exports: [CommonModule, MaterialAppModule]
})

export class SharedModule {

}
