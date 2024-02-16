import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/core/models/user.model';
import { RolesService } from 'src/app/services/roles.service';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit{
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateComponent>,
    private fb: FormBuilder,
    private usersService: UsersService,
    private sweetAlertService: SweetAlertService,
    private rolesService: RolesService,
  ) { this.id = data.id}

  apiUrl = environment.apiUrl;
  avatarUrl = environment.avatarUrl;

  id?:number;
  userData?:User;
  userForm: FormGroup | any;
  roleOption:{ value: number; label: string }[] = [];
  isActive:boolean = true;
  isSubmit = false;

  selectedFile: any;
  selectedFile_preview: any;

  ngOnInit(): void {
    this.fetchRoles();
    this.fetchUser();
    this.initForm();
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

  fetchUser(): void {
    this.usersService.getUser(this.id!).subscribe((res)=>{
      this.userData = res
      this.userForm.patchValue(this.userData);
      this.isActive = this.userData.Active
      console.log(this.userForm.value)
    })
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
      formData.append('Img', this.userForm.get('Img').value);


      if (this.selectedFile) {
          formData.delete('Img');
          formData.append('Img', this.selectedFile, this.selectedFile.name);
      }

      this.sweetAlertService.showConfirmUpdate().then((result)=>{
        if (result.isConfirmed) {
          this.isSubmit = false;
          // const formData = this.userForm.value;
          this.usersService.updateUser(this.id!,formData).subscribe((res)=>{
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
        this.selectedFile = file;
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

}
