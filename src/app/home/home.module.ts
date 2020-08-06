import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { VMessageModule } from './../shared/components/vmessage/vmessage.module';
import { SignInComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SignUpService } from './signup/signup.service';
import { HomeRoutingModule } from './home.routing.module';
import { HomeComponent } from './home.component';


@NgModule({
    declarations: [
        SignInComponent,
        SignupComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        VMessageModule,
        RouterModule,
        HomeRoutingModule
    ],
    providers:[
        SignUpService
    ]
})
export class HomeModule { }