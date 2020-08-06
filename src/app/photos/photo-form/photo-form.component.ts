import { UserService } from './../../core/user/user.service';
import { AlertService } from './../../shared/alert/alert.service';
import { Router } from '@angular/router';
import { PhotoService } from './../photo/photo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: string;

  percentDone = 0;

  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    });
  }

  upload() {
    const description = this.photoForm.get('description').value;
    const allowComments = this.photoForm.get('allowComments').value;

    this.photoService
      .upload(description, allowComments, this.file)
      .pipe(finalize(() => this.router.navigate(['/user', this.userService.getUserName()])))
      .subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.alertService.success('Upload complete', true)
        }
      },
        err => {
          console.log(err);
          this.alertService.danger('Upload error!', true)
        });
  }

  handleFile(file: File) {
    this.file = file;
    const reader = new FileReader();
    reader.onload = ((event: any) => this.preview = event.target.result);
    reader.readAsDataURL(file);
  }
}