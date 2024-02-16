// sweet-alert.service.ts

import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  // Basic alert
  showAlert(
    title:string,
    text:string,
    icon:'success' | 'error' | 'warning' | 'info' = 'success'
  ): Promise<any> {
    return Swal.fire({
      title,
      text,
      icon,
      showConfirmButton: false,
      timer: 1500
    });
  }
  showSuccess(): Promise<any> {
    return Swal.fire({
      title: 'Success',
      text: 'Your submission has been received',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    });
  }
  showConfirmCreate(): Promise<any> {
    return Swal.fire({
      title: 'เพิ่มข้อมูล',
      text: 'Your submission has been received',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#C8B8E1',
      cancelButtonColor: '#dcd9d9',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    });
  }
  showConfirmUpdate(): Promise<any> {
    return Swal.fire({
      title: 'อัพเดทข้อมูล',
      text: 'Your submission has been received',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#C8B8E1',
      cancelButtonColor: '#dcd9d9',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    });
  }
  showConfirmDelete(): Promise<any> {
    return Swal.fire({
      title: 'ลบข้อมูล',
      text: 'Your submission has been received',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#C8B8E1',
      cancelButtonColor: '#dcd9d9',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    });
  }

  // Confirm alert
  showConfirm(title: string, text: string, icon: 'success' | 'error' | 'warning' | 'info' = 'warning'): Promise<any> {
    return Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    });
  }

  // Custom alert
  showCustomAlert(options: SweetAlertOptions): Promise<any> {
    return Swal.fire(options);
  }
}
