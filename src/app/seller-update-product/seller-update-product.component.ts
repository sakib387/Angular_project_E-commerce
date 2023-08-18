import { Component } from '@angular/core';
import { product } from '../data-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {
  productData!:product;
  message!:string;
  constructor(private route:ActivatedRoute,
    private product:ProductService,
    private router:Router
    
    ){}

  ngOnInit(){
    let pId=this.route.snapshot.paramMap.get('id');
    pId && this.product.getProduct(pId).subscribe((res)=>{
     this.productData=res;
    })
  }
  submitProduct(data:product){
    if(this.productData){
      data.id=this.productData.id;
    }
     this.product.updateProducr(data).subscribe((res)=>{
       if(res){
        this.message="product updated successfully"
       }
       setTimeout(() => {
        this.message="";
        this.router.navigate(['seller-home'])
       }, 2000);
     })
  }
}
