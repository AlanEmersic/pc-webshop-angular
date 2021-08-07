import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit {
  customer!: Customer;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService
      .getCurrentCustomer()
      .subscribe((currentCustomer: Customer) => {
        this.customerService.currentCustomer = currentCustomer;
        this.customer = currentCustomer;        
      });
  }
}
