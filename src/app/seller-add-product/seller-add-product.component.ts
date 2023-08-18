import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-model';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  constructor(private product:ProductService){}
    message!:string;
   submitProduct(data:product){
    this.product.addProduct(data).subscribe((res)=>{
      if(res){
        this.message="product added successfully";
      }
      else{
        this.message="something wrong";
      }
      setTimeout(() => {
        this.message='';
      }, 3000);
    })
  
  }
}
