import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { CreateComponent } from './create/create.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';
import { UpdateComponent } from './update/update.component';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  
  constructor(
    private http: HttpClient,
    private productService: ProductsService,
    public dialog: MatDialog,
    public sweetAlertService: SweetAlertService
  ) {}

  displayedColumns: string[] = [ 'Name', 'CreatedAt', 'Description', 'Price', 'Management'];
  dataSource:any;
  products:Product|any

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(){
    this.productService.getProducts().subscribe(data => {
      data.forEach(element => {
        if (element.CreatedAt) {
          element.CreatedAt =  new DatePipe('en-US').transform(element.CreatedAt, 'yyyy-MM-dd HH:mm')!;
        }
      });
      this.products = data
      this.dataSource = new MatTableDataSource<Product>(data);

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
        this.fetchProducts();
      }
    });
  }

  updateDialog(id:number): void {
    const dialogRef = this.dialog.open(UpdateComponent, {
      // width: '250px',
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.sweetAlertService.showAlert('Success','Update Product Success')
        this.fetchProducts();
      }
    });
  }

  deleteDialog(id:number): void {
    this.sweetAlertService.showConfirm('Deleted Product','Are you sure you want to delete item ?').then((result)=>{
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe((res)=>{
          this.sweetAlertService.showAlert('Success','Your submission has been received','success').then((result)=>{
            this.fetchProducts();
          })
        })
      }
    })
  }

}
