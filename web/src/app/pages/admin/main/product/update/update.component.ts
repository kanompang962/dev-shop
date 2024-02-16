import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/core/models/product.model';
import { Size } from 'src/app/core/models/size.model';
import { ProductsService } from 'src/app/services/products.service';
import { SizesService } from 'src/app/services/sizes.service';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateComponent>,
    private fb: FormBuilder,
    private sizesService: SizesService,
    private sweetAlertService: SweetAlertService,
    private productsService: ProductsService,
  ) { this.id = data.id }

  apiUrl = environment.apiUrl;
  imageUrl = environment.imageUrl;

  id?:number;
  prodForm: FormGroup | any;
  prods?:Product;
  roleOption:{ value: number; label: string }[] = [];
  isActive:boolean = true;
  sizes:Size[] = []
  isSubmit = false;

  selectedFile: any;
  selectedFile_preview: any;

  ngOnInit(): void {
    this.fetchProduct();
    this.initForm();
  }

  initForm(): void {
    this.prodForm = this.fb.group({
      Name: ['', Validators.required],
      Img: [''],
      Description: ['', Validators.required],
      Price: [0, Validators.required],
      Stock: [{ value: 0, disabled: true }],
      Active: [true, Validators.required],
      Sizes: [this.fb.array([])],
      // Sizes: [this.fb.array([
      //   this.fb.group({ SizeNameID: 1, Amount: 0, }),
      //   this.fb.group({ SizeNameID: 2, Amount: 0, }),
      //   this.fb.group({ SizeNameID: 3, Amount: 0, }),
      //   this.fb.group({ SizeNameID: 4, Amount: 0, }),
      //   this.fb.group({ SizeNameID: 5, Amount: 0, }),
      //   this.fb.group({ SizeNameID: 6, Amount: 0, }),
      //   this.fb.group({ SizeNameID: 7, Amount: 0, }),
      //   this.fb.group({ SizeNameID: 8, Amount: 0, }),
      // ])],
    });
  }

  fetchProduct(): void {
    this.productsService.getProduct(this.id!).subscribe((res)=>{
      this.prods = res;
      this.prodForm.patchValue(this.prods)
      const prodSize = this.fb.array(
        this.prods.Sizes['map']((size:Size) => this.fb.group({ 
          ID: size.ID,
          Name: size.SizeName.Name, 
          SizeNameID: size.SizeNameID, 
          Amount: size.Amount, 
        }))
      );
      this.prodForm.get('Sizes').patchValue(prodSize);
    })

  }

  onSubmit(): void {
    this.isSubmit = true;
    if (this.prodForm.valid) {
      const formData = new FormData();
      for (const controlName in this.prodForm.controls) {
        const control = this.prodForm.get(controlName);
        if (control.value && controlName != 'Sizes') {
          console.log(controlName)
          formData.append(controlName, control.value);
        }
      }
      formData.append('Img', this.prodForm.get('Img').value);
      formData.append('Sizes', JSON.stringify(this.prodForm.value.Sizes.value));
      if (this.selectedFile) {
        formData.delete('Img');
        formData.append('Img', this.selectedFile, this.selectedFile.name);
      }
          formData.forEach((value, key) => {
        console.log(key, value);
      });
      this.sweetAlertService.showConfirmUpdate().then((result)=>{
        if (result.isConfirmed) {
          this.isSubmit = false;
          // const formData = this.prodForm.value;
          this.productsService.updateProduct(this.id!,formData).subscribe((res)=>{
            this.dialogRef.close(true);
          })
        }
      })
    }
  }

  onAmountChange(): void {
    let sum = 0;
    this.prodForm.value.Sizes.value.forEach((element: Size) => {
      sum += element.Amount
    });
    this.prodForm.patchValue({
      Stock: sum
    })
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedFile_preview = reader.result;
        this.selectedFile = file;
      };
    }
  }

  onToggleChange(event:any): void {
    this.isActive = event.checked,
    this.prodForm.patchValue({
      Active: this.isActive 
    });
  }

  clearProfile(): void {
      this.selectedFile = null;
      this.selectedFile_preview = null;
      this.prodForm.patchValue({ 
        Img: '' 
      });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
