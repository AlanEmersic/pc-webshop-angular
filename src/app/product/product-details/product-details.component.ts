import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Location } from '@angular/common';
import { Product } from '../product.model';
import { CustomerService } from 'src/app/customer/customer.service';
import { Customer } from 'src/app/customer/customer.model';
import { CartService } from 'src/app/cart/cart.service';
import { CartItem } from 'src/app/cart/cart-item.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  private customer!: Customer;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private customerService: CustomerService,
    private cartService: CartService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerService
      .getCurrentCustomer()
      .subscribe((currentCustomer: Customer) => {
        this.customerService.currentCustomer = currentCustomer;
        this.customer = currentCustomer;
      });

    this.getProductBySerialNumber();
  }

  isRoleAdmin(): boolean {
    return !!this.customerService.isRoleAdmin();
  }

  isRoleCustomer(): boolean {
    return !!this.customerService.isRoleCustomer();
  }

  getProductBySerialNumber() {
    const serialNumber = this.route.snapshot.paramMap.get('serialNumber') || '';

    if (serialNumber != null) {
      this.productService
        .getProductBySerialNumber(serialNumber)
        .subscribe((product) => {
          this.product = product;
        });
    }
  }

  addCartItem(product: Product) {
    this.cartService.getCartInfo(this.customer.username).subscribe((cart) => {
      const cartItem: CartItem = {
        productId: product.id ? product.id : -1,
        cartId: cart.cartId,
        amount: 1,
      };          

      this.cartService
        .addProductToCart(this.customer.username, cartItem)
        .subscribe(() => {          
          this.router.navigate(['/cart']);
        });
    });
  }

  goBack() {
    this.location.back();
  }
}
