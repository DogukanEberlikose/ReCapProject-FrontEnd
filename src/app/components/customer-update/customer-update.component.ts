import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {
  customer:Customer
  customerUpdateForm : FormGroup;

  constructor(private customerService:CustomerService,private formBuilder:FormBuilder,private toastrService:ToastrService) { }

  ngOnInit(): void {
  }
  createCustomerUpdateForm(){
    this.customerUpdateForm = this.formBuilder.group({
      
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      companyName: ["", Validators.required],
      
    })
  }
  customerUpdate(customerId:number)
  {
     this.customerService.customerUpdate(customerId).subscribe(response=>{
      this.customer = response.data;

    })
}
}
