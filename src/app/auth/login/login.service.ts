import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtToken } from '../jwt-token.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from 'src/app/customer/customer.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  authenticate(customer: Customer): Observable<JwtToken> {
    const url = environment.apiURL;            
    return this.http.post<JwtToken>(`${url}/login`, customer);
  }

  logout(): void {
    localStorage.removeItem('token');    
  }
}
