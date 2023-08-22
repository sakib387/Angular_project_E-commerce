import { EventEmitter, Injectable } from '@angular/core';
import { signIn, signUp } from '../data-model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isloginflase=new EventEmitter<boolean>
 constructor(private http:HttpClient,private rout:Router){}
 
  userSignup(data:signUp){
   this.http.post('http://localhost:3000/users',data,{observe:'response'}).subscribe((res)=>{
   // console.log(data)
     if(res){
      localStorage.setItem('user',JSON.stringify(res.body));
      this.rout.navigate(['/'])
     }
   })
  }
  userLogin(data:signIn){

    this.http.get<signUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{observe:'response'})
    .subscribe((res)=>{
      if(res && res.body?.length){
        this.isloginflase.emit(false);
        localStorage.setItem('user',JSON.stringify(res.body[0]));
        this.rout.navigate(['/'])
      }
      else{
       this.isloginflase.emit(true);
      }
    })
  }
  userReload(){
    if(localStorage.getItem('user')){
      this.rout.navigate(['/'])
    }
  }
}