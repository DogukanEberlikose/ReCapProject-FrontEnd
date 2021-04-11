import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = "https://localhost:44341/api/colors"

  constructor(private httpClient:HttpClient) { }
  getColors():Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl+"/getall");
  }
  
  getByColor(colorId:number):Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl+"/GetById?id="+colorId);
  }
  add(color:Color):Observable<ResponseModel>{
    console.log(color)
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/add",color)
}
}
