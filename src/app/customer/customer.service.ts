import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, EMPTY, of } from 'rxjs';
import { Customer } from './customer.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customerURL = environment.apiURL + '/customers';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  currentCustomer!: Customer | null;

  constructor(private http: HttpClient) {}

  getCurrentCustomer(): Observable<Customer> {
    const token = localStorage.getItem('token');

    if (token === null) return EMPTY;

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token ? token : '');

    return this.http.get<Customer>(
      `${this.customerURL}/${decodedToken?.username}`
    );
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customerURL).pipe(
      tap(() => console.log('fetched customers')),
      catchError(this.handleError<Customer[]>('getCustomers', []))
    );
  }

  registerCustomer(customer: Customer): Observable<Customer> {
    const url = environment.apiURL + '/register';
    return this.http.post<Customer>(url, customer, this.httpOptions).pipe(
      tap(() => console.log(`register Customer`)),
      catchError(this.handleError<Customer>('registerCustomer'))
    );
  }

  isRoleAdmin(): boolean {
    if (this.currentCustomer) {
      return this.currentCustomer.username === 'admin';
    } else {
      return false;
    }
  }

  isRoleCustomer(): boolean {
    if (this.currentCustomer) {
      return this.currentCustomer.username !== 'admin';
    } else {
      return false;
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation);
      console.error(error);
      return of(result as T);
    };
  }
}
