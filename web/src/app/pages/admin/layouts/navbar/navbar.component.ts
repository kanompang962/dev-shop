import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Output() toggleDrawerEvent = new EventEmitter<void>();

  toggleDrawer() {
     this.toggleDrawerEvent.emit();
  }
}
