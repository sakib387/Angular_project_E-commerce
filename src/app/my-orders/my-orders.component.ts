import { Component, numberAttribute } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orderLinst:any[]|undefined
  constructor(private product:ProductService){}
  ngOnInit(){
    this.product.orderLinst().subscribe((res)=>{
    this.orderLinst=res
    })
 
  }
  cancleOrder(id:number){
    this.product.deleteOrder(id).subscribe((res)=>{
      this.product.orderLinst().subscribe((res)=>{
        this.orderLinst=res
        })
    })
    
  }
}
