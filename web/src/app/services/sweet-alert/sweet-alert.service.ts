// sweet-alert.service.ts

import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  // Basic alert
  showAlert(title: string, text: string, icon: 'success' | 'error' | 'warning' | 'info' = 'success'): Promise<any> {
    return Swal.fire({
      title,
      text,
      icon,
      showConfirmButton: false,
      timer: 1500
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
