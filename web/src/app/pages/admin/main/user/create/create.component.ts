import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageResizeService } from 'src/app/core/funcs/reSizeImage';
import { Role } from 'src/app/core/models/role.model';
import { RolesService } from 'src/app/services/roles.service';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit{
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateComponent>,
    private fb: FormBuilder,
    private usersService: UsersService,
    private sweetAlertService: SweetAlertService,
    private rolesService: RolesService,
    private imageResizeService: ImageResizeService,
  ) {}

  userForm: FormGroup | any;
  roleOption:{ value: number; label: string }[] = [];
  isActive:boolean = true;
  isSubmit = false;

  selectedFile: any;
  selectedFile_preview: any;

  ngOnInit(): void {
    this.initForm();
    this.fetchRoles();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Img: [''],
      // Email: ['', [Validators.required, Validators.email]],
      Username: ['', Validators.required],
      Password: ['', Validators.required],
      RoleID: [null, Validators.required],
      Active: [true],
    });
  }

  fetchRoles(): void {
    this.rolesService.getRoles().subscribe((res)=>{
      res.forEach((element) => {
        this.roleOption.push({
          value: element.ID!,
          label: element.Name!
        })
      });
    })
  }

  onSubmit(): void {
    this.isSubmit = true;
    if (this.userForm.valid) {
      this.userForm.patchValue({ RoleID: parseInt(this.userForm.get('RoleID').value) });

      const formData = new FormData();
      formData.append('FirstName', this.userForm.get('FirstName').value);
      formData.append('LastName', this.userForm.get('LastName').value);
      formData.append('Username', this.userForm.get('Username').value);
      formData.append('Password', this.userForm.get('Password').value);
      formData.append('RoleID', this.userForm.get('RoleID').value);
      formData.append('Active', this.userForm.get('Active').value);

      if (this.selectedFile) {
        console.log('if')
        formData.append('Img', this.selectedFile, this.selectedFile.name);
      }

      this.sweetAlertService.showConfirmCreate().then((result)=>{
        if (result.isConfirmed) {
          this.isSubmit = false;
          // const formData = this.userForm.value;
          this.usersService.createUser(formData).subscribe((res)=>{
            this.dialogRef.close(true);
          })
        }
      })
    }
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedFile_preview = reader.result;
        // this.selectedFile = file;
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
    this.userForm.patchValue({
      Active: this.isActive 
    });
  }

  clearProfile(): void {
      this.selectedFile = null;
      this.selectedFile_preview = null;
      this.userForm.patchValue({ 
        Img: '' 
      });
  }

  onClose(): void {
    this.dialogRef.close();
  }

    // onSelectionChange(event:any): void {
  //   console.log(event)
  //   this.userForm.patchValue({
  //     RoleID: parseInt(event), 
  //   });
  // }

}
