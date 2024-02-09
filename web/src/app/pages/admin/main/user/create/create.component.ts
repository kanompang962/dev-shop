import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  ) {}

  userForm: FormGroup | any;
  roleOption:{ value: number; label: string }[] = [];
  isSubmit = false;

  ngOnInit(): void {
    this.initForm();
    this.fetchRoles();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      // Img: [''],
      // Email: ['', [Validators.required, Validators.email]],
      Username: ['', Validators.required],
      Password: ['', Validators.required],
      RoleID: [0, Validators.required],
      Active: [false, Validators.required],
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
    console.log(this.userForm.value)
    this.isSubmit = true;
    if (this.userForm.valid) {
      this.sweetAlertService.showConfirm('Confirm !','Are you sure you want to confirm ?').then((result)=>{
        if (result.isConfirmed) {
          this.isSubmit = false;
          const formData = this.userForm.value;
          this.usersService.createUser(formData).subscribe((res)=>{
            this.dialogRef.close(true);
          })
        }
      })
    }
  }

  onSelectionChange(event:any): void {
    console.log(event)
    this.userForm.patchValue({
      RoleID: parseInt(event), 
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
