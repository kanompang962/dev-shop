import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../core/models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private apiUrl = 'http://localhost:8080'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}/roles`);
  }

  postRole(data: Role): Observable<Role> {
    return this.http.post<Role>(`${this.apiUrl}/role`, data);
  }
}
