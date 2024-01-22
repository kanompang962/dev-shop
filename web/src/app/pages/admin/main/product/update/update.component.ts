import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/core/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateComponent>,
    private productsService:ProductsService,
    private fb: FormBuilder,
    private sweetAlertService: SweetAlertService,
  ) {}

  prodForm: FormGroup | any;
  isSubmit = false;
  product: Product|undefined;

  ngOnInit(): void {
    this.initForm();
    this.fetchProduct(this.data.id);
  }

  initForm(): void {
    this.prodForm = this.fb.group({
      Name: ['', Validators.required],
      Price: ['', Validators.required],
      Description: [''],
      // Img: [''],
    });
  }

  fetchProduct(id:number): void {
    this.productsService.getProduct(id).subscribe((res)=>{
      this.product = res;
      this.prodForm.setValue({
        Name:this.product.Name,
        Price:this.product.Price,
        Description:this.product.Description,
      });
    })
  }


  onSubmit(): void {
    this.isSubmit = true;
    if (this.prodForm.valid) {
      this.sweetAlertService.showConfirm('Confirm !','Are you sure you want to confirm ?').then((result)=>{
        if (result.isConfirmed) {
          this.isSubmit = false;
          const formData = this.prodForm.value;
          this.productsService.update(this.data.id, formData).subscribe((res)=>{
            this.dialogRef.close(true);
          })
        }
      })
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
