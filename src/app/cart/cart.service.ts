import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CartItem } from './cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartURL = environment.apiURL + '/cart';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getCartByUsername(username: string): Observable<any[]> {
    const url = `${this.cartURL}/${username}/cart`;
    return this.http.get<any[]>(url).pipe(
      tap(() => console.log('fetched cart')),
      catchError(this.handleError<any[]>('getCartByUsername'))
    );
  }

  getCartInfo(username: string): Observable<any> {
    const url = `${this.cartURL}/${username}`;
    return this.http.get<any>(url).pipe(
      tap(() => console.log('fetched cart info')),
      catchError(this.handleError<any>('getCartInfo'))
    );
  }

  addProductToCart(username: string, item: CartItem): Observable<CartItem> {
    const url = `${this.cartURL}/${username}/cart`;
    return this.http.post<CartItem>(url, item, this.httpOptions).pipe(
      tap(() => console.log(`added product to cart`)),
      catchError(this.handleError<CartItem>('addProductToCart'))
    );
  }

  deleteProductFromCart(username: string, id: number): Observable<CartItem> {    
    const url = `${this.cartURL}/${username}/cart/${id}`;

    return this.http.delete<CartItem>(url, this.httpOptions).pipe(
      tap(() => console.log(`delete cart item id=${id}`)),
      catchError(this.handleError<CartItem>('deleteProductFromCart'))
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
