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
  productData!:product;
   constructor(private activeRoute:ActivatedRoute,
    private product:ProductService
    ){}

   ngOnInit(){
    let id=this.activeRoute.snapshot.paramMap.get('id');
     id && this.product.getProduct(id).subscribe((res)=>{
        this.productData=res;
        this.price=Number(res.price);
     })
   }
   qunatity(nam:string){
 
    if(nam==='min'){
      if(this.qun>1)
      this.qun=this.qun-1;
     
    }
    else{
      this.qun=this.qun+1;
    }
   }
}
