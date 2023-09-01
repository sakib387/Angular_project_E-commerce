import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, product } from '../data-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 CartData=new EventEmitter<product[]|[]>();
  constructor(private http:HttpClient) { }
  addProduct(data:product){
    return this.http.post('http://localhost:3000/products',data)
  }
  productList(){
    return this.http.get<product[]>('http://localhost:3000/products');
  }
  deleteProduct(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }
  getProduct(id:string){
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }
  updateProducr(prduct:product){
    return this.http.put<product>(`http://localhost:3000/products/${prduct.id}`,prduct);

  }
  popularProduct(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3');
  }
  trendyProduct(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
  }

  searchProduct(qury:string){
    return this.http.get<product[]>(`http://localhost:3000/products?q=${qury}`);
  }
  localAddToCart(data:product){
    let cartData=[];let localCart=localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]));

    }
    else{
      cartData=JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart',JSON.stringify(cartData));

    }
    this.CartData.emit(cartData);
  }
  removefromCart(id:number){
    let cartData=localStorage.getItem('localCart');
    if(cartData){
      let items:product[]=JSON.parse(cartData);
      items=items.filter((item:product)=>id!=item.id)
      localStorage.setItem('localCart',JSON.stringify(items));
      this.CartData.emit(items);
    }
  }
  addTocart(data:cart){
    return this.http.post('http://localhost:3000/cart',data)
  }
  getfromcart(data:number){
    return this.http.get<product[]>(`http://localhost:3000/cart?userId=${data}`,{observe:'response'}).subscribe((res)=>{
    if(res &&res.body) 
    this.CartData.emit(res.body)
    })
  }
  removecart(productid: number, userId: number) {
    console.log('sakib mollah', userId,productid);
    const url = `http://localhost:3000/cart?productId=${productid}&userId=${userId}`;
    return this.http.get(url).subscribe((res: any) => {  
      console.log(res) 
      if (res.length > 0) {
        let id = res[0].id;
         this.http.delete('http://localhost:3000/cart/'+id).subscribe((res)=>{
            if(res){
              this.getfromcart(userId)
            }
         })
      }
    });
  }
  currentCart(){
    let userSore=localStorage.getItem('user');
    let userData= userSore && JSON.parse(userSore);
    let id=userData.id
    return this.http.get<cart[]>(`http://localhost:3000/cart?userId=${id}`)
      
  }
  
  orderNow(data:any){
   return this.http.post('http://localhost:3000/orders',data)
  }
  orderLinst(){
    let userSore=localStorage.getItem('user');
    let userData= userSore && JSON.parse(userSore);
    let id=userData.id
    return this.http.get<any>(`http://localhost:3000/orders?userId=${id}`)
     
  }
  deleteCart(data:number){
    this.http.delete('http://localhost:3000/cart/'+data,{observe:'response'}).subscribe((res)=>{
            if(res){
               this.CartData.emit([])
            }
         })
  }
  deleteOrder(id: number): Observable<any> {
    return this.http.delete('http://localhost:3000/orders/' + id);
  }
  
}
