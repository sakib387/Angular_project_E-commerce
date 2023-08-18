import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-model';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  productList!:product[];
constructor(private product:ProductService){}
ngOnInit():void{
  this.product.productList().subscribe((res)=>{
   this.productList=res;
  })
}
}
