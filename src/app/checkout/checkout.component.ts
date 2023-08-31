import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  totalPrice:number|undefined 
  constructor(private product:ProductService){}
   
  ngOnInit(){
    this.product.currentCart().subscribe((res)=>{
   
      let price=0;
      res.forEach((item)=>{
        price=price+(Number(item.price)*Number(item.quantity))
      })
     this.totalPrice=price+(price/10)+100-(price/10)
     console.log(this.totalPrice)
    })
  }
  orderNow(data:any){
    let user=localStorage.getItem('user');
    let userId=user && JSON.parse(user).id;
    let orderData={
      ...data,
      totalPrice:this.totalPrice,
      userId:userId
    }
    this.product.orderNow(orderData).subscribe((res)=>{
      
    })
  }
}
