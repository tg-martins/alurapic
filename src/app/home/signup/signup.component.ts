import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';

import { userNamePassword } from './username-password.validator';
import { PlataformDetectorService } from './../../core/plataform-detector/plataform-detector.service';
import { SignUpService } from './signup.service';
import { NewUser } from './new-user';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserNotTakenValidatorService]
})

export class SignupComponent implements OnInit, AfterViewInit {

  signupForm: FormGroup
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private signUpService: SignUpService,
    private router: Router,
    private platformDetectorService: PlataformDetectorService,
    private cdRef: ChangeDetectorRef,) { }

  ngAfterViewInit(): void {
    this.platformDetectorService.isPlatformBrowser() &&
      this.emailInput.nativeElement.focus();
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({

      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      fullName: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40)
        ]
      ],
      userName: ['',
        [
          Validators.required,
          lowerCaseValidator,
          Validators.minLength(2),
          Validators.maxLength(30)
        ],
        this.userNotTakenValidatorService.checkUserNameTaken()
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(14)
        ]
      ],

    }, {
      validator: userNamePassword
    });
  }

  signUp() {

    if (this.signupForm.valid && !this.signupForm.pending) {
      const newUser = this.signupForm.getRawValue() as NewUser;
      this.signUpService.signUp(newUser)
        .subscribe(
          () => this.router.navigate(['']),
          err => console.log(err))
    }
  }
}
