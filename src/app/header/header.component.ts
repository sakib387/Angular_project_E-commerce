import { Component } from '@angular/core';
import{Router } from "@angular/router"
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  manuType:string='default';
  sellerName:string='';
   constructor(private route:Router){}
   ngOnInit(){
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller')&&val.url.includes('seller')){
          console.log(val.url)
        this.manuType='seller';
        if(localStorage.getItem('seller')){
          let sellerStorage=localStorage.getItem('seller');
          let sellerData=sellerStorage && JSON.parse(sellerStorage)[0];
          this.sellerName=sellerData.name;
        }
        }
      
      else{
        this.manuType='default';
      }}
    })
   }
   LogOut(){
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
   }
}
