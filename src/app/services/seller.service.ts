import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { signUp } from '../data-model';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
   islogedIn=false;
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
}
