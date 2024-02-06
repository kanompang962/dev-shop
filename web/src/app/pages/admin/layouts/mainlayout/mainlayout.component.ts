import { Component, OnInit } from '@angular/core';
import { getSession } from 'src/app/core/funcs/geSession';
import { setSession } from 'src/app/core/funcs/setSession';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-mainlayout',
  templateUrl: './mainlayout.component.html',
  styleUrls: ['./mainlayout.component.scss']
})
export class MainlayoutComponent implements OnInit {
  constructor(

  ){}


  ngOnInit(): void {

  }
}
