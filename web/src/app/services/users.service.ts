import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:8080'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getUsers(keywords: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users?keywords=${keywords}`);
  }
  
  getUser(id:number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/${id}`);
  }

  createUser(data: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/user`, data);
  }

  updateUser(id : number ,data: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/user/${id}`, data);
  }

  deleteUser(id:number): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/user/${id}`);
  }
}
