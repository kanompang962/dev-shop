import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../core/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'http://localhost:8080'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer `);
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }
  
  getProduct(id:number): Observable<Product> {
    const headers = new HttpHeaders().set('Authorization', `Bearer `);
    return this.http.get<Product>(`${this.apiUrl}/product/${id}`);
  }

  createProduct(product: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/product`, product);
  }

  updateProduct(id : number ,product: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/product/${id}`, product);
  }

  deleteProduct(id:number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/product/${id}`);
  }
}
