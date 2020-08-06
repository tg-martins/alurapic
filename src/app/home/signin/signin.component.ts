import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PlataformDetectorService } from './../../core/plataform-detector/plataform-detector.service';
import { AuthService } from '../../core/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit, AfterViewInit {
    fromUrl: string;
    loginForm: FormGroup;

    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private plataformDetectorService: PlataformDetectorService,
        private cdRef: ChangeDetectorRef,
        private activatedRoute: ActivatedRoute) { }

    ngAfterViewInit(): void {
        this.plataformDetectorService.isPlatformBrowser() &&
            this.userNameInput.nativeElement.focus();
        this.cdRef.detectChanges()
    }

    ngOnInit(): void {
        this.activatedRoute
            .queryParams
            .subscribe(params => this.fromUrl = params['fromUrl']);

        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });

    }

    login() {
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;

        this.authService.authenticate(userName, password)
            .subscribe(
                () => 
                    this.fromUrl 
                    ? this.router.navigateByUrl(this.fromUrl)
                    : this.router.navigate(['user', userName])
                ,
                (err) => {
                    console.log(err);
                    this.loginForm.reset();
                    this.plataformDetectorService.isPlatformBrowser() &&
                        this.userNameInput.nativeElement.focus();
                    alert('invalid username or password');
                })

    }

}