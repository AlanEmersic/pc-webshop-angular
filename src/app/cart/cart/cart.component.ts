import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/customer/customer.model';
import { CustomerService } from 'src/app/customer/customer.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartProducts: any[] = [];
  cartSum: number = 0;
  private customer!: Customer;

  constructor(
    private cartService: CartService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customerService
      .getCurrentCustomer()
      .subscribe((currentCustomer: Customer) => {
        this.customerService.currentCustomer = currentCustomer;
        this.customer = currentCustomer;
        this.getProducts();
      });
  }

  getProducts() {
    this.cartProducts = [];
    this.cartSum = 0;

    this.cartService
      .getCartByUsername(this.customer?.username)
      .subscribe((items) => {        
        items.forEach((item) => {
          this.cartProducts.push(item);
          this.cartSum += item.price;
        });
      });
  }

  deleteCartProduct(id: number) {    
    this.cartService
      .deleteProductFromCart(this.customer.username, id)
      .subscribe(() => {                
        this.getProducts();
      });
  }
}
