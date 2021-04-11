import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms"
import { Local } from 'protractor/built/driverProviders';
import { LocalService } from 'src/app/services/local.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  carId: number;
  customers: Customer[];
  cars: Car[];
  rentals: Rental[] = [];
  dataLoaded = false;
  rentDate: Date;
  returnDate: Date;
  customerId: number;
  rentForm: FormGroup;
  userId:number;

  carDetailDto!:CarDetailDto;

  minDate: string | any;
  maxDate: string | null;
  maxMinDate: string | null;
  firstDateSelected: boolean = false;

  constructor(
    private rentalService: RentalService,
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private router: Router,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private formBuilder:FormBuilder,
    private local:LocalService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.carId = params['carId'];
        
        this.getCarDetailsByCarId(params['carId']);
      }
    });
    this.getCustomer();
    this.getUserId();
    this.getCustomerId(this.userId);
    this.createRentForm();
    console.log(this.carId)
    
  }
  getRentals() {
    this.rentalService.getRentals().subscribe((response) => {
      this.rentals = response.data;
      this.dataLoaded = true;
    });
  }
  

  getCustomer() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
      this.dataLoaded = true;
    });
  }

  getCarDetailsByCarId(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe(
      (response) => {
        this.carDetailDto = response.data;
        console.log(this.carDetailDto);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  createRentForm(){
    this.rentForm=this.formBuilder.group({
      rentDate:["",Validators.required],
      returnDate:[""]
    })
  }
  createRent(){
    let rent:Rental={
      rentDate:this.rentForm.controls["rentDate"].value,
      returnDate:this.rentForm.controls["returnDate"].value,
      carId:this.carId,
      customerId:this.customerId}
      console.log(this.customerId)
      this.rentalService.addRental(rent).subscribe(
        response=> {
          this.toastrService.info("Kiralama İşlemi Başarılı")
        }) 
  }
  getUserId(){
    let token=this.local.get("token")
    let decoded=jwtDecode(token)
    this.userId=Object.values(decoded)[0]
  }
  getCustomerId(userId:number){
    this.customerService.getCustomerByUserId(userId).subscribe(response=>{this.customerId=response.data.customerId})
  }

  
}