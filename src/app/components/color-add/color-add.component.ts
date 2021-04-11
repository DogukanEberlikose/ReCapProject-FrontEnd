import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  colorAddForm:FormGroup;

  constructor(private formBuilder:FormBuilder,private toastrService:ToastrService, private colorService:ColorService) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      colorName:["",Validators.required,  Validators.length>2]

    })
  }
  add(){
    if(this.colorAddForm.valid){
      let brandModel = Object.assign({},this.colorAddForm.value)
      this.colorService.add(brandModel).subscribe(response=>{
        console.log(response)
        this.toastrService.success(response.message)
      })
      
    }else{
      this.toastrService.error("Hata");
      

    }
    
  }
}
