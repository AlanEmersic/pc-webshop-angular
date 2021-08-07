import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/customer/customer.model';
import { CustomerService } from 'src/app/customer/customer.service';
import { JwtToken } from '../jwt-token.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  authenticating = false;
  loginFailed = false;
  customer!: Customer;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customer = new Customer();
  }

  login() {
    this.authenticating = true;
    this.loginFailed = false;
    this.loginService
      .authenticate(this.customer)
      .subscribe(
        (jwtToken: JwtToken) => this.successfulLogin(jwtToken),
        () => (this.loginFailed = true)
      )
      .add(() => (this.authenticating = false));
  }

  successfulLogin(jwtToken: JwtToken) {
    localStorage.setItem('token', jwtToken.token);
    this.customerService
      .getCurrentCustomer()
      .subscribe(
        (currentCustomer: Customer) =>
          (this.customerService.currentCustomer = currentCustomer)
      );
    this.router.navigate(['/']);
  }
}
