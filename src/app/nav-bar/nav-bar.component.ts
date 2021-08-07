import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../auth/login/login.service';
import { Customer } from '../customer/customer.model';
import { CustomerService } from '../customer/customer.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  customer!: Customer;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customerService
      .getCurrentCustomer()
      .subscribe((currentCustomer: Customer) => {
        this.customerService.currentCustomer = currentCustomer;
        this.customer =  currentCustomer;                
      });
  }

  logout() {
    this.loginService.logout();
    this.customerService.currentCustomer = null;
    this.router.navigate(['/products']);
  }

  isUserLoggedIn(): boolean {
    return !!this.customerService.currentCustomer;
  }

  isRoleAdmin(): boolean {
    return !!this.customerService.isRoleAdmin();
  }

  isRoleCustomer(): boolean {
    return !!this.customerService.isRoleCustomer();
  }
}
