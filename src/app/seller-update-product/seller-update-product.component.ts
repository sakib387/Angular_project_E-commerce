import { Component } from '@angular/core';
import { product } from '../data-model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {
  productData!:product;
  constructor(private route:ActivatedRoute,
    private product:ProductService
    
    ){}

  ngOnInit(){
    let pId=this.route.snapshot.paramMap.get('id');
    pId && this.product.getProduct(pId).subscribe((res)=>{
     this.productData=res;
    })
  }
  submitProduct(data:product){

  }
}
