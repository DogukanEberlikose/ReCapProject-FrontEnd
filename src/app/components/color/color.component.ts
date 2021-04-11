import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  colors: Color[] = []
  currentColor: Color; //Burasını newlemek için böyle yazdık.
  emptyColor:Color;
  color:Color;

  constructor(private colorService:ColorService,) { }

  ngOnInit(): void {this.getColors()}
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data

    })
    
  }
  getColor(colorId:number)
  {
    this.colorService.getByColor(colorId).subscribe(response=>{
      this.color = response.data[0]

    })
  }
  setAllCurrentColor()
  {
    this.currentColor=this.emptyColor;
  }
  setCurrentColor(color:Color){
    console.log(color.colorName)
    this.currentColor = color;
  }
  getCurrentColorClass(color:Color){
    if(color == this.currentColor){
      return "list-group-item active"
    }else{

    return "list-group-item"
  }
}
getAllColorClass(){
  if(!this.currentColor){
    return "list-group-item active"
  }else{
    return "list-group-item"
  }
}
}
