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
  srcProduct!:product[];
   constructor(private route:Router,private product:ProductService){}
   ngOnInit(){
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller')&&val.url.includes('seller')){
          console.log(val.url)
        this.manuType='seller';
        if(localStorage.getItem('seller')){
          let sellerStorage=localStorage.getItem('seller');
          let sellerData=sellerStorage && JSON.parse(sellerStorage)[0];
          this.sellerName=sellerData.name;
        }
        }
      
      else{
        this.manuType='default';
      }}
    })
    
   }
   LogOut(){
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
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
}
