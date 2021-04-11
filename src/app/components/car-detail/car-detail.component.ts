import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CarImageService } from 'src/app/services/carImage.service';
import { CartService } from 'src/app/services/cart.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  car!: CarDetailDto;
  carImage: CarImage[]=[];
  filterText = '';
  rentals: Rental[] = [];

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private cartService: CartService,
    private rentalService:RentalService,
    private carImageService:CarImageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getImageByCarId(params['carId'])
        this.getCarDetailsByCarId(params['carId']);
      }

    });
  }

  addToCart() {
    this.toastrService.success('Sepete Eklendi', this.car.carId.toString());

    this.carService.getById(this.car.carId).subscribe(
      (p) => {
        this.cartService.addToCart(p.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCarDetailsByCarId(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.car = response.data;
      console.log(this.car);
    }, error=>{console.log(error)});
  }
  getRentals() {
    this.rentalService.getRentals().subscribe((response) => {
      this.rentals = response.data;
      
      
    });
  }
  getImageByCarId(carId:number){
     this.carImageService.getImageByCarId(carId).subscribe(response => {
       this.carImage = response.data;
       console.log(this.carImage)
      
     })
   }

}
