import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { product } from '../data-model';

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
}
