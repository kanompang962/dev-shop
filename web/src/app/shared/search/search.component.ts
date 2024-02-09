import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Output() searchEvent = new EventEmitter<string>();

  searchQuery: string = '';

  onInputChange(): void {
    this.searchEvent.emit(this.searchQuery);
  }
}
