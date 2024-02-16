import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageResizeService } from 'src/app/core/funcs/reSizeImage';
import { Size } from 'src/app/core/models/size.model';
import { ProductsService } from 'src/app/services/products.service';
import { SizesService } from 'src/app/services/sizes.service';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';

interface StockItem {
  key: number;
  value: number; // You might want to replace 'any' with the actual type of 'event'
}

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
    private sizesService: SizesService,
    private sweetAlertService: SweetAlertService,
    private productsService: ProductsService,
    private imageResizeService: ImageResizeService,
  ) {}

  prodForm: FormGroup | any;
  roleOption:{ value: number; label: string }[] = [];
  isActive:boolean = true;
  sizes:Size[] = []
  isSubmit = false;
  stock:StockItem[] = []
  sum_stock:number = 0;

  selectedFile: any;
  selectedFile_preview: any;

  ngOnInit(): void {
    this.initForm();
    this.fetchSizes();
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

  fetchSizes(): void {
    this.sizesService.getSizesName().subscribe((res)=>{
      this.sizes = res

      const sizesFormArray = this.fb.array(
        this.sizes.map(size => this.fb.group({ 
          Name: size.Name, 
          SizeNameID: size.ID, 
          Amount: 0, 
        }))
      );
      this.prodForm.get('Sizes').patchValue(sizesFormArray);
    })
  }

  onSubmit(): void {
    this.isSubmit = true;
    if (this.prodForm.valid) {
      const formData = new FormData();
      for (const controlName in this.prodForm.controls) {
        const control = this.prodForm.get(controlName);
        if (control.value && controlName != 'Sizes') {
          formData.append(controlName, control.value);
        }
      }
      formData.append('Sizes', JSON.stringify(this.prodForm.value.Sizes.value));
      // formData.forEach((value, key) => {
      //   console.log(key, value);
      // });
      if (this.selectedFile) {
        formData.append('Img', this.selectedFile, this.selectedFile.name);
      }
      this.sweetAlertService.showConfirmCreate().then((result)=>{
        if (result.isConfirmed) {
          this.isSubmit = false;
          this.productsService.createProduct(formData).subscribe((res)=>{
            this.dialogRef.close(true);
          })
        }
      })
    }
  }

  resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!canvas || !ctx) {
          reject('Canvas or 2D context is not supported.');
          return;
        }

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const resizedImageDataUrl = canvas.toDataURL('image/jpeg');
        resolve(resizedImageDataUrl);
      };

      img.onerror = () => {
        reject('Error loading image.');
      };
    });
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
        const maxWidth = 1920;
        const maxHeight = 1080;
        this.imageResizeService.resizeImage(file, maxWidth, maxHeight)
        .then(resizedImageBlob => {
          this.selectedFile = new File([resizedImageBlob], 'resized_' + file.name);
        })
        .catch(error => {
          console.error(error);
        });
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
