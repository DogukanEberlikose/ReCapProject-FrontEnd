import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm : FormGroup;
  colors:Color[]=[];
  brands:Brand[]=[];

  constructor(private formBuilder:FormBuilder, 
    private carService: CarService, 
    private toastrService:ToastrService,
    private colorService:ColorService,
    private brandService:BrandService,) { }

  ngOnInit(): void {
    this.createCarAddForm();
    this.setValues();
  }

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      brandId:["", Validators.required],
      dailyPrice: ["", Validators.required],
      colorId: ["", Validators.required],
      modelYear: ["", Validators.required],
      description: ["", Validators.required],
    })
  }

  add(){
    console.log(this.carAddForm.value)
    if(this.carAddForm.valid){
      let carModel = Object.assign({},this.carAddForm.value)
      carModel.colorId= +carModel.colorId;
      carModel.brandId= +carModel.brandId;
      this.carService.add(carModel).subscribe(data=>{
        console.log(data)
        this.toastrService.success("Ürün eklendi!")
      })
      
    }else{
      this.toastrService.error("Formunuz eksik, Lütfen kontrol ediniz.")

    }
    
  }
  setValues(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data
      console.log(this.colors)
      console.log(response.data)
  
    })
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data
    })
  }

}
