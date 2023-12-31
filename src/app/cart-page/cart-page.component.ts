import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, pricesummary } from '../data-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cartData!:cart[];
  priceSummary:pricesummary={
    price:0,
    dincount:0,
    tax:0,
    delivery:0,
    total:0
  };
  constructor(private product:ProductService,
    private router:Router
    ){}

  ngOnInit(){
    this.loadPage()
  }
  checkout(){
    this.router.navigate(['checkout'])
  }
  removeCart(id:any){
    let user=localStorage.getItem('user');
    // console.log(user)
     let userId=user && JSON.parse(user).id;
     console.log(id)
     console.log(userId)
      this.product.removecart(id,userId)
      this.loadPage()
  }
  loadPage(){
    this.product.currentCart().subscribe((res)=>{
      this.cartData=res
      let price=0;
      res.forEach((item)=>{
        price=price+(Number(item.price)*Number(item.quantity))
      })
      this.priceSummary.price=price
      this.priceSummary.delivery=100
      this.priceSummary.tax=price/10
      this.priceSummary.dincount=price/10
      this.priceSummary.total=price+(price/10)+100-(price/10)
    })
    if(!this.cartData.length){
      this.router.navigate(['/'])
    }
  }
}
