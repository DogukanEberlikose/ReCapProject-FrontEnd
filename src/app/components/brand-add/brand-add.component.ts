import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  brandAddForm: FormGroup;
  constructor(private formBuilder:FormBuilder, private brandService:BrandService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({
      brandName:["",Validators.required, Validators.length>2]

    })
  }
  add(){
    if(this.brandAddForm.valid){
      let brandModel = Object.assign({},this.brandAddForm.value)
      this.brandService.add(brandModel).subscribe(data=>{
        console.log(data)
        this.toastrService.success("Ürün eklendi!")
      })
      
    }else{
      this.toastrService.error("Geçersiz Marka")

    }
    
  }
}
