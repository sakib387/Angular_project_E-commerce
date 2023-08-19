import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
   popularProduct!:product[];
   constructor(private product:ProductService){}
  ngOnInit():void{
    this.product.popularProduct().subscribe((data)=>{
   this.popularProduct=data;
    })
  }

}
