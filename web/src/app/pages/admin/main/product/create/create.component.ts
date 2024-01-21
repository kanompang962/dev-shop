import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products.service';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateComponent>,
    private fb: FormBuilder,
    private productsService: ProductsService,
    private sweetAlertService: SweetAlertService,
  ) {}

  prodForm: FormGroup | any;
  isSubmit = false;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.prodForm = this.fb.group({
      Name: ['', Validators.required],
      Price: ['', Validators.required],
      Description: [''],
      Img: [''],
    });
  }

  onSubmit(): void {
    this.isSubmit = true;
    if (this.prodForm.valid) {
      this.sweetAlertService.showConfirm('Confirm !','Are you sure you want to confirm ?').then((result)=>{
        if (result.isConfirmed) {
          this.isSubmit = false;
          const formData = this.prodForm.value;
          this.productsService.postProduct(formData).subscribe((res)=>{
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
