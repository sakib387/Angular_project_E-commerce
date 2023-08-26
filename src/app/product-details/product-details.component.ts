import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-model';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
   qun:number=1;
   price:number=0;
   cartData!:product;
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
            this.cartData=item[0];
          }
          else false;
        }
     })
     let user=localStorage.getItem('user');
     let userId=user && JSON.parse(user).id;
     if(userId){
      this.product.getfromcart(userId)
      this.product.CartData.subscribe((res)=>{
      
       let item= res.filter((item:product)=>item.productId?.toString()==id)
      if(item.length>0){
        this.removecrt=true;
      }
      })
     }
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
    if(this.productData){
      this.productData.quantity=this.qun;
      if(!localStorage.getItem('user')){

        this.product.localAddToCart(data)
        this.removecrt=true;
      }
      else{
        let user=localStorage.getItem('user');
        let userId=user && JSON.parse(user).id;
        let cartDate:cart={
          ...this.productData,
          userId:userId,
          productId:this.productData.id
        }
        delete cartDate.id;
        this.product.addTocart(cartDate).subscribe((res)=>{
         if(res){
          this.product.getfromcart(userId)
           this.removecrt=true;
         }
        })
      }
    }
   }
   removeCatd(id:number){
    this.removecrt=false;
    if(!localStorage.getItem('user')){

      this.product.removefromCart(id)
       
    }
    else{
       
      let user=localStorage.getItem('user');
     // console.log(user)
      let userId=user && JSON.parse(user).id;
      console.log(id)
      console.log(userId)
       this.product.removecart(id,userId)
     
    }
   }
}
