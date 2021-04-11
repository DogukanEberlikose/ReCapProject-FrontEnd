import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetailDto } from '../models/carDetailDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44341/api/";

  constructor(private httpClient:HttpClient) { }

  getById(carId:number):Observable<SingleResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getbyid?id="+carId
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }
  getProducts():Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/details"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getProductsByBrand(brandId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getbybrand?brandId="+brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  add(car:Car):Observable<ResponseModel>{
    console.log(car)
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",car)
  }
  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getbycolor?colorId="+ colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  
  }


 getCarDetailsByCarId(carId:number):Observable<SingleResponseModel<CarDetailDto>>{
    let newPath = this.apiUrl + "cars/getdetailbyid?carId="+carId
    return this.httpClient.get<SingleResponseModel<CarDetailDto>>(newPath);
}
getCarImageByCarId(carId:number):Observable<SingleResponseModel<CarDetailDto>>{
  let newPath = this.apiUrl + "getbycarid/="+carId
  return this.httpClient.get<SingleResponseModel<CarDetailDto>>(newPath);
}
getFilteredCars(brandId:number, colorId:number):Observable<ListResponseModel<Car>>
  {
    let newPath = this.apiUrl + "cars/getallcardetailsbyfilter?brandId=" + brandId + "&colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}