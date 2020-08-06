import { Directive, OnInit, ElementRef, Renderer2, Input } from '@angular/core';

import { Photo } from './../../photo/photo';
import { UserService } from './../../../core/user/user.service';

@Directive({
    selector: '[photoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective implements OnInit {

    @Input() ownedPhoto: Photo;

    constructor(
        private element: ElementRef,
        private renderer: Renderer2,
        private userService: UserService) { }


    ngOnInit(): void {
        this.userService
            .getUser()
            .subscribe(user => {
                if (!user || user.id != this.ownedPhoto.userId) {
                    this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
                }
            });
    }
}