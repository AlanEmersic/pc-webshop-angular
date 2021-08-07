import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Product } from './product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productURL = environment.apiURL + '/products';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productURL).pipe(
      tap(() => console.log('fetched products')),
      catchError(this.handleError<Product[]>('getProducts', []))
    );
  }

  getProductBySerialNumber(serialNumber: string): Observable<Product> {
    const url = `${this.productURL}/${serialNumber}`;
    return this.http.get<Product>(url).pipe(
      tap(() => console.log('fetched product')),
      catchError(this.handleError<Product>('getProductBySerialNumber'))
    );
  }

  addProduct(product: Product): Observable<Product> {
    const url = `${this.productURL}`;
    return this.http.post<Product>(url, product, this.httpOptions).pipe(
      tap(() => console.log(`added product`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  updateProduct(serialNumber: string, price: number): Observable<Product> {
    const url = `${this.productURL}/${serialNumber}?price=${price}`;
    let product!: Product;
    this.getProductBySerialNumber(serialNumber).subscribe((p) => {
      product = p;
      product.price = price;
    });

    return this.http.put<Product>(url, product, this.httpOptions).pipe(
      tap(() => console.log(`update product`)),
      catchError(this.handleError<Product>('updateProduct'))
    );
  }

  deleteProduct(product: Product | string): Observable<Product> {
    const serialNumber = typeof product === 'string' ? product : product.serialNumber;
    const url = `${this.productURL}/${serialNumber}`;

    return this.http.delete<Product>(url, this.httpOptions).pipe(
      tap(() => console.log(`delete product serialNumber=${serialNumber}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation);
      console.error(error);
      return of(result as T);
    };
  }
}
