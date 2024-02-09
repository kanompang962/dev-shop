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

  displayedColumns: string[] = ['FirstName', 'LastName','Username','Role', 'Active', 'Management'];
  dataSource:any;
  users: User[] = []
  option = [
    {value:1, label:'a'},
    {value:2, label:'b'},
    {value:3, label:'c'},
  ]
  keywords = ''

  ngOnInit(): void {
    this.createDialog()
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
    const dialogRef = this.dialog.open(CreateComponent, {
      // width: '250px',
      data: { title: 'Dialog Title', message: 'Hello from the dialog!' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.sweetAlertService.showAlert('Success','Your submission has been received','success')
        this.fetchUsers();
      }
    });
  }

  updateDialog(id:number): void {
    
  }

  deleteDialog(id:number): void {

  }

  handleSearchChange(value: string): void {
    this.keywords = value
    this.fetchUsers();
  }

}
