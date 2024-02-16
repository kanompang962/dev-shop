import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user.model';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';
import { UsersService } from 'src/app/services/users.service';
import { CreateComponent } from './create/create.component';
import { environment } from 'src/environments/environment';
import { UpdateComponent } from './update/update.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  
  constructor(
    private http: HttpClient,
    private usersService: UsersService,
    public dialog: MatDialog,
    public sweetAlertService: SweetAlertService
  ) {}

  displayedColumns: string[] = ['No', 'Img', 'FirstName', 'LastName','Username','Role', 'Active', 'Management'];
  dataSource:any;
  users: User[] = []
  keywords = ''
  apiUrl = environment.apiUrl;
  avatarUrl = environment.avatarUrl;

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(){
    this.usersService.getUsers(this.keywords).subscribe((data) => {
      data.forEach(element => {
        if (element.CreatedAt) {
          element.CreatedAt =  new DatePipe('en-US').transform(element.CreatedAt, 'yyyy-MM-dd HH:mm')!;
        }
      });
      this.users = data
      this.dataSource = new MatTableDataSource<User>(data);

      // Set paginator if available
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  createDialog(): void {
    const dialogRef = this.dialog.open(CreateComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.sweetAlertService.showSuccess();
        this.fetchUsers();
      }
    });
  }

  updateDialog(id:number): void {
    const dialogRef = this.dialog.open(UpdateComponent, {
      data: { id: id},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.sweetAlertService.showSuccess();
        this.fetchUsers();
      }
    });
  }

  deleteDialog(id:number): void {
    this.sweetAlertService.showConfirmDelete().then((result)=>{
      if (result.isConfirmed) {
        this.usersService.deleteUser(id).subscribe((res)=>{
          this.sweetAlertService.showSuccess().then((result)=>{
            this.fetchUsers();
          })
        })
      }
    })
  }

  handleSearchChange(value: string): void {
    this.keywords = value
    this.fetchUsers();
  }

}
