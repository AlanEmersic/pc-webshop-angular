import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/customer/customer.model';
import { CustomerService } from 'src/app/customer/customer.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products!: Product[];
  productUpdate!: Product;
  isEdit: boolean = false;
  textProductName!: string; 

  constructor(
    private productService: ProductService,
    private customerService: CustomerService,    
  ) {}

  ngOnInit(): void {
    this.customerService
      .getCurrentCustomer()
      .subscribe((currentCustomer: Customer) => {
        this.customerService.currentCustomer = currentCustomer;       
      });

    this.getProducts();
  }

  isRoleAdmin(): boolean {
    return !!this.customerService.isRoleAdmin();
  }

  getProducts() {
    this.productService
      .getProducts()
      .subscribe((products) => (this.products = products));
  }

  addProduct(form: any) {
    const product = {
      name: form.value.name,
      serialNumber: form.value.serialNumber,
      price: form.value.price,
      brand: form.value.brand,
      description: form.value.description,
      img: form.value.img,
      categoryName: form.value.categoryName,
    };

    this.productService.addProduct(product).subscribe((product) => {
      this.products.push(product);
      form.reset();
    });
  } 

  editProduct(product: Product) {
    this.isEdit = true;
    this.productUpdate = product;
  }

  updateProduct(product: Product, form: any) {
    if (form.value.price != null && form.value.price != undefined) {
      product.price = form.value.price;
      this.productService
        .updateProduct(product.serialNumber, product.price)
        .subscribe();
      form.reset();
      this.isEdit = false;
    }
  }

  deleteProduct(product: Product): void {
    this.products = this.products?.filter((p) => p !== product);
    this.productService.deleteProduct(product).subscribe();
  }
}
