import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { ProductService } from '../services/product.service';
import { product } from '../data-model';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
   constructor(private activeRoute:ActivatedRoute,
    private product:ProductService
    ){}
    searchRes!:product[];
   ngOnInit(){
    let qry=this.activeRoute.snapshot.paramMap.get('query');
   
    qry && this.product.searchProduct(qry).subscribe((res)=>{
      this.searchRes=res;
    })
  }
}
