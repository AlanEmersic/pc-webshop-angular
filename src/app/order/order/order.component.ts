import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/customer/customer.model';
import { CustomerService } from 'src/app/customer/customer.service';
import { Order } from '../order.model';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orders!: Order[];
  customer!: Customer;

  constructor(
    private customerService: CustomerService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.customerService
      .getCurrentCustomer()
      .subscribe((currentCustomer: Customer) => {
        this.customerService.currentCustomer = currentCustomer;
        this.customer = currentCustomer;
        this.getOrders();
      });
  }

  getOrders() {
    this.orders = [];

    if (this.customer.username === 'admin') {
      this.orderService.getOrders().subscribe((orders) => {
        this.orders = orders;
      });
    } else {
      this.orderService
        .getOrdersByCustomerId(this.customer.id ? this.customer.id : -1)
        .subscribe((orders) => {
          this.orders = orders;          
        });
    }
  }
}
