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
  productMessage!:string;
constructor(private product:ProductService){}
ngOnInit():void{
  this.List();
}
deleteProduct(id:number){
  
   this.product.deleteProduct(id).subscribe((res)=>{
      if(res){
        this.productMessage="Item has been removed"
        this.List();
      }
      setTimeout(() => {
        this.productMessage="";
      }, 2000);
   })
}
List(){
  this.product.productList().subscribe((res)=>{
    this.productList=res;
   })
}
}
