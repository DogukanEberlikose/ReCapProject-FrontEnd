import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  apiUrl = "https://localhost:44341/api/carimages"

  constructor(private httpClient:HttpClient) { }
  getImages():Observable<ListResponseModel<CarImage>> {
    return this.httpClient.get<ListResponseModel<CarImage>>(this.apiUrl+"/getall");
  }
  
  getImageByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl + "/getbycarid?carId=" + carId
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);

  }
}
