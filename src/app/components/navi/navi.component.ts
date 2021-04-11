import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  authenticated:boolean;
  user:User;

  constructor(private autService:AuthService, private userService:UserService) { }

  ngOnInit(): void {
    this.isAuthenticated()
    this.getUserByMail()
  }

  isAuthenticated(){
    if(
      this.autService.isAuthenticated()
    ){
      this.authenticated=true
    }else{
      this.authenticated=false
    }
  }
  getUserByMail(){
    this.userService.getUserByMail(localStorage.getItem("email")).subscribe((response)=>{
      this.user=response.data;
    })
  }
}
