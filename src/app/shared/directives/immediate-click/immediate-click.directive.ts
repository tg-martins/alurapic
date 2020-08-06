import { element } from 'protractor';
import { PlataformDetectorService } from './../../../core/plataform-detector/plataform-detector.service';
import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[immediateClick]'
})
export class ImmediateClickDirective implements OnInit{

  constructor(
    private element: ElementRef<any>,
    private platformDetector: PlataformDetectorService) { }

  ngOnInit(): void {
    this.platformDetector.isPlatformBrowser() && this.element.nativeElement.click();
  }

}
