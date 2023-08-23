import { Component } from '@angular/core';
import{Router } from "@angular/router"
import { ProductService } from '../services/product.service';
import { product } from '../data-model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  manuType:string='default';
  sellerName:string='';
  userName:string='';
  srcProduct!:product[];
  cardItem:number=0;
   constructor(private route:Router,private product:ProductService){}
   ngOnInit(){
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller')&&val.url.includes('seller')){
        let sellerStore=localStorage.getItem('seller');
        let sellerData=sellerStore && JSON.parse(sellerStore)[0];
        this.sellerName=sellerData.name;
        this.manuType='seller';
        }
        else if(localStorage.getItem('user')){
       let userSore=localStorage.getItem('user');
       let userData= userSore && JSON.parse(userSore);
       this.userName=userData.name;
       this.manuType='user';

        }
      else{
        this.manuType='default';
      }}
    })
    let cartData=localStorage.getItem('localCart');
    if(cartData){
      this.cardItem=JSON.parse(cartData).length
    }
    this.product.CartData.subscribe((res)=>{
      this.cardItem=res.length;
    })
    
   }

   LogOut(){
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
    this.product.CartData.emit([]);
   }
   
   searchProduct(qry:KeyboardEvent){
    if(qry){
      const element=qry.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((res)=>{
        if(res.length>5)res.length=5;
     this.srcProduct=res;
      })
    }
   }
   removeSearch(){
    this.srcProduct=[];
   }
   searchAproduct(valu:string){
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate(['search', valu]);
    });
    }
    dounevent(id:number){
      this.route.navigate(['details',id])
    }
     userlogout() {
      localStorage.removeItem('user');
    this.route.navigate(['user-auth']);
     }

}
