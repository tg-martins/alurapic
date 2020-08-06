import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PhotoComponent } from './photo.component';

@NgModule({
    declarations: [
        PhotoComponent
    ],
    imports: [
        HttpClientModule,
        CommonModule
    ],
    exports: [
        PhotoComponent
    ]
})
export class PhotoModule { }