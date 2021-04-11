
import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';


@Component({
  selector: 'app-brand',
  templateUrl:'./brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brands : Brand[] = []
  currentBrand: Brand; //Burasını newlemek için böyle yazdık.
  emptyBrand:Brand;
  constructor(private brandService: BrandService,) { }

  ngOnInit(): void { this.getBrands()}
  
  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data
      
    })
    
  }
  setAllCurrentBrand()
  {
    this.currentBrand=this.emptyBrand;
  }
  setCurrentBrand(brand:Brand){
    console.log(brand.brandName)
    this.currentBrand = brand;
  }
  getCurrentBrandClass(brand:Brand){
    if(brand == this.currentBrand){
      return "list-group-item active"
    }else{

    return "list-group-item"
  }
  }

  getAllBrandClass(){
    if(!this.currentBrand){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }
}