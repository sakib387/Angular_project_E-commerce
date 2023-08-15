import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SellerService } from './services/seller.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  constructor(private  sellservice:SellerService) {
     
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if(localStorage.getItem('seller')){
     return true;
    }
    return this.sellservice.islogedIn;  
  }
}
