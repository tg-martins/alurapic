import { RouterModule } from '@angular/router';
import { VMessageModule } from './../../shared/components/vmessage/vmessage.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PhotoFormComponent } from './photo-form.component';
import { PhotoModule } from '../photo/photo.module';
import { ImmediateClickModule } from 'src/app/shared/directives/immediate-click/immediate-click.module';

@NgModule({
    declarations:[
        PhotoFormComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        VMessageModule,
        PhotoModule,
        ImmediateClickModule,
        RouterModule
    ]
})
export class PhotoFormModule{}