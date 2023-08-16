import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { signIn, signUp } from '../data-model';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
   islogedIn=false;
   isLogin=true;
  constructor(private http:HttpClient,
    private router:Router
    ) { }
  userSignUp(data:signUp){
    return this.http.post('http://localhost:3000/seller',data,{observe:'response'})
    .subscribe((res)=>{
      this.islogedIn=true;
      localStorage.setItem('seller',JSON.stringify(res.body))
      this.router.navigate(['seller-home'])
      console.log(this.islogedIn)
    })
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.islogedIn=true; this.router.navigate(['seller-home'])
    }
  }
  userLogin(data :signIn){
    //normal login is post method but it is json server here it get
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((res:any)=>{
      if(res&&res.body&&res.body.length){
        localStorage.setItem('seller',JSON.stringify(res.body))
        this.router.navigate(['seller-home'])
      }
      else{
       this.isLogin=false;
      }
    })
  }
}
