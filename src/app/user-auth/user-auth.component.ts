import { Component } from '@angular/core';
import { signIn, signUp } from '../data-model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
   constructor(private user:UserService){}
   toogle:boolean=false;
   message:string='';
   ngOnInit(){
    this.user.userReload();
   }
   signUp(data:signUp){
  this.user.userSignup(data);
  
   }
   login(data:signIn){
    this.message='';
     this.user.userLogin(data)
     this.user.isloginflase.subscribe((res)=>{
      if(res==false){
      this.message='';
      }
      else{
        this.message='login fail'
      }
     })
   }
   toggle(){
     this.toogle=!this.toogle;
   }
}
