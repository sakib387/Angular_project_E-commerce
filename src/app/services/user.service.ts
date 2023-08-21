import { Injectable } from '@angular/core';
import { signUp } from '../data-model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
 constructor(private http:HttpClient,private rout:Router){}
 
  userSignup(data:signUp){
   this.http.post('http://localhost:3000/users',data,{observe:'response'}).subscribe((res)=>{
   // console.log(data)
     if(res){
      localStorage.setItem('user',JSON.stringify(res.body));
     }
   this.rout.navigate(['/'])
   })
  }
  userReload(){
    if(localStorage.getItem('user')){
      this.rout.navigate(['/'])
    }
  }
}