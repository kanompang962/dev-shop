import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {  Router } from '@angular/router';
import { getSession, removeSession } from 'src/app/core/funcs/sessionService';
import { User } from 'src/app/core/models/user.model';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  constructor(
    private utilityService:UtilityService,
    private route:Router
  ){}

  @Output() toggleDrawerEvent = new EventEmitter<void>();
  title = ''
  user?: User

  ngOnInit(): void {
    this.setTitle();
    this.getUser();
  }

  setTitle(): void {
    this.utilityService.stateTitle$.subscribe((state)=>{
      this.title = state
    })
  }

  getUser(): void {
    const res = getSession('user')
    this.user = res.data
  }

  toggleDrawer() {
     this.toggleDrawerEvent.emit();
  }

  logout(): void {
    if (removeSession('user')) {
      this.route.navigate(['/'])
    }
  }
}
