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
 
   ngOnInit(){
    this.user.userReload();
   }
   signUp(data:signUp){
  this.user.userSignup(data);
  
   }
   login(kdata:signIn){

   }
   toggle(){
     this.toogle=!this.toogle;
   }
}
