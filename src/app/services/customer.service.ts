import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Customer } from '../models/customer';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = 'https://localhost:44341/api/';
  constructor(private httpClient: HttpClient) { }
  getCustomers(): Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + 'customers/getcustomerdetail';
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
  getCustomerById(customerId: number): Observable<SingleResponseModel<Customer>> {
    let newPath = this.apiUrl + 'customers/getcustomerdetailbycustomerid?customerId=' + customerId;
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
  }
  customerUpdate(customerId: number): Observable<SingleResponseModel<Customer>> {
    let newPath = this.apiUrl + 'customers/update?customerId=' + customerId;
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
}
getCustomerByUserId(userId: number): Observable<SingleResponseModel<Customer>> {
  let newPath = this.apiUrl + 'customers/GetById?id=' + userId;
  return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
}
}
