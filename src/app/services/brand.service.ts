import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:44341/api/"

  constructor(private httpClient:HttpClient) { }
  getBrands():Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl+"brands/getall");
  }
  add(brand:Brand):Observable<ResponseModel>{
    console.log(brand)
    return this.httpClient.post<ResponseModel>(this.apiUrl+"brands/add",brand)
}
}
