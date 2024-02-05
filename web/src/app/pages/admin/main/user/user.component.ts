import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user.model';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';
import { UsersService } from 'src/app/services/users.service';

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

  displayedColumns: string[] = ['FirstName', 'LastName','Username', 'Management'];
  dataSource:any;
  users: User[] = []
  option = [
    {value:1, label:'a'},
    {value:2, label:'b'},
    {value:3, label:'c'},
  ]

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(){
    this.usersService.getUsers().subscribe((data) => {
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
    
  }

  updateDialog(id:number): void {
    
  }

  deleteDialog(id:number): void {

  }

  handleSearchChange(value: string): void {
    console.log('Selected Value:', value);
    // Handle the selected value as needed
  }

  handleSelectionChange(selectedValue: Event): void {
    console.log('Selected Value:', selectedValue);
    // Handle the selected value as needed
  }

}
