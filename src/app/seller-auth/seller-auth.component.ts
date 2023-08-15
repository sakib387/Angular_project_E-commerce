import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { signUp } from '../data-model';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  constructor(private seller:SellerService,
   private router:Router,
    ){}
    ngOnInit(){
      this.seller.reloadSeller()
    }
  signUp(data:signUp){
     this.seller.userSignUp(data) 
  }
}
