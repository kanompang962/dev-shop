import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Size } from '../core/models/size.model';

@Injectable({
  providedIn: 'root'
})
export class SizesService {

  constructor(private http: HttpClient) {}

  getSizesName(): Observable<Size[]> {
    return this.http.get<Size[]>(`${environment.apiUrl}/sizes_name`);
  }
}
