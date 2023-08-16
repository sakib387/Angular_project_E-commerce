import { Component } from '@angular/core';
import{Router } from "@angular/router"
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  manuType:string='default';
   constructor(private route:Router){}
   ngOnInit(){
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller')&&val.url.includes('seller')){
          console.log(val.url)
        this.manuType='seller';
        }
      
      else{
        this.manuType='default';
      }}
    })
   }
}
