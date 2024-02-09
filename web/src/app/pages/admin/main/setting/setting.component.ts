import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../../../services/roles.service';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';
import { Role } from 'src/app/core/models/role.model';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  constructor(
    private rolesService:RolesService,
    private sweetAlertService:SweetAlertService
  ){}

  nameRole = '';

  ngOnInit(): void {
  }

  addRole(): void {
    const data: Role = {
      Name: this.nameRole
    };
    this.rolesService.postRole(data).subscribe((res) => {
      if (res) {
        this.sweetAlertService.showAlert('Success','Your submission has been received','success')
        this.nameRole = ''
      }
    })
  }

}
