import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/customer/customer.model';
import { CustomerService } from 'src/app/customer/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  customers!: Customer[];  
  checkUsername: boolean = false;
  isSuccess: boolean = false;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe((customers) => {
      this.customers = customers;      
    });
  }

  register(form: any) {
    const customer = {
      username: form.value.username,
      password: form.value.password,
      email: form.value.email,
    };

    this.customers.some((c) => {
      if (c.username === customer.username) {
        this.checkUsername = true;
      }
    });

    if (!this.checkUsername) {
      this.customerService.registerCustomer(customer).subscribe((c) => {
        form.reset();
        this.isSuccess = true;
      });
    }
  }
}
