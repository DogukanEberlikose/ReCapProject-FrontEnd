import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'https://localhost:44341/api/';
  constructor(private httpClient: HttpClient) { }
  getUsers(): Observable<ListResponseModel<User>> {
    let newPath = this.apiUrl + 'users/getall';
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }
  getUserById(Id: number): Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + 'users/getbyid?userId=' + Id;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
  getUserByMail(mail: string): Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + 'users/getbymail?mail=' + mail;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
}

  
