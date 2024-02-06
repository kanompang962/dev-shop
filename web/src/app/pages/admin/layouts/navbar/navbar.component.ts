import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  constructor(
    private utilityService:UtilityService
  ){}

  @Output() toggleDrawerEvent = new EventEmitter<void>();
  title = ''

  ngOnInit(): void {
    this.setTitle()
  }

  setTitle(): void {
    this.utilityService.stateTitle$.subscribe((state)=>{
      this.title = state
    })
  }

  toggleDrawer() {
     this.toggleDrawerEvent.emit();
  }
}
