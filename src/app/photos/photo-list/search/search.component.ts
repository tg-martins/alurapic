import { Component, OnInit, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'ap-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  @Output() onTyping = new EventEmitter<string>();
  debounce: Subject<string> = new Subject<string>();
  @Input() value: string = '';

  constructor() { }

  ngOnInit(): void {
    this.debounce
      .pipe(debounceTime(300))
      .subscribe(filter => this.onTyping.emit(filter));
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }


}
