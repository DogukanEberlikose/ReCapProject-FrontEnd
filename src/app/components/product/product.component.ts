import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { CarImageService } from 'src/app/services/carImage.service';
import { CartService } from 'src/app/services/cart.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  carImage: CarImage[] = [];
  cars: Car[] = [];
  dataLoaded = false;
  filterText = '';
  carId:number;
  car:CarDetailDto
  brands:Brand[]=[]
  colors:Color[]=[]
  brandId: number;
  colorId: number;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private cartService: CartService,
    private carImageService: CarImageService,
    private brandService:BrandService,
    private colorService:ColorService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
       
        this.getProductsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getProductsByColor(params['colorId']);
      } else {
       
       
      }
    });
    this.getColors()
    this.getBrands()
    this.getProducts();
    
  }

  getProducts() {
    this.carService.getProducts().subscribe((response) => {
      this.cars = response.data;
      
      this.dataLoaded = true;
      
    });
  }
  getProductsByBrand(brandId: number) {
    this.carService.getProductsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
     
    });
  }
  getProductsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
      
    });
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  getImageByCarId(carId: number) {
    
    this.carImageService.getImageByCarId(carId).subscribe((response) => {
      this.carImage = response.data;
      console.log(response.data)
      
      
    });
  }

  getFilteredCars(brandId:number, colorId:number){
    this.carService.getFilteredCars(brandId, colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
  })
}
getSelectedColorId(colorId: number) {
  if(this.colorId == colorId)
  {
    return true;
  }
  else
  {
    return false;
  }
}

getSelectedBrandId(brandId: number) {
  if(this.brandId == brandId)
  {
    return true;
  }
  else
  {
    return false;
  }
}
}
