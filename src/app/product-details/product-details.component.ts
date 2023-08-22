import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { ProductService } from '../services/product.service';
import { product } from '../data-model';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
   qun:number=1;
   price:number=0;
   removecrt:boolean=false;
  productData!:product;
   constructor(private activeRoute:ActivatedRoute,
    private product:ProductService
    ){}

   ngOnInit(){
    let id=this.activeRoute.snapshot.paramMap.get('id');
     id && this.product.getProduct(id).subscribe((res)=>{
        this.productData=res;
         
        let cartData=localStorage.getItem('localCart');
        if(id&&cartData){
          let item=JSON.parse(cartData)
          item=item.filter((itm:product)=>id==itm.id.toString())
          if(item.length){
            this.removecrt=true;
          }
          else false;
        }
     })
   }
   qunatity(nam:string){
 
    if(nam==='min'){
      if(this.qun>1)
      this.qun--;
     
    }
    else{
      this.qun++;
    }
   }
   addCatd(data:product){
    this.product.localAddToCart(data)
    this.removecrt=true;
   }
   removeCatd(id:number){
    this.product.removefromCart(id)
    this.removecrt=false;
   }
}
