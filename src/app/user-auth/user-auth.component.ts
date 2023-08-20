import { Component } from '@angular/core';
import { signUp } from '../data-model';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {

  signUp(data:signUp){
   console.log(data)
   }
}
