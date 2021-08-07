import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderURL = environment.apiURL + '/orders';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    const url = `${this.orderURL}`;
    return this.http.get<Order[]>(url).pipe(
      tap(() => console.log('fetched orders')),
      catchError(this.handleError<Order[]>('getOrders'))
    );
  }

  getOrdersByCustomerId(id: number): Observable<Order[]> {
    const url = `${this.orderURL}/${id}`;
    return this.http.get<Order[]>(url).pipe(
      tap(() => console.log('fetched customer orders')),
      catchError(this.handleError<Order[]>('getOrdersByCustomerId'))
    );
  }

  addOrder(order: Order): Observable<Order> {
    const url = `${this.orderURL}`;
    return this.http.post<Order>(url, order, this.httpOptions).pipe(
      tap(() => console.log(`added order`)),
      catchError(this.handleError<Order>('addOrder'))
    );
  }

  deleteOrder(id: number): Observable<Order> {
    const url = `${this.orderURL}/${id}`;

    return this.http.delete<Order>(url, this.httpOptions).pipe(
      tap(() => console.log(`delete order id=${id}`)),
      catchError(this.handleError<Order>('deleteOrder'))
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
