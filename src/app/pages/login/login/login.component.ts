import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = "";
  password: string = "";

  constructor(
    private readonly service: UserService
  ){}

  authenticate(){
    this.service.login(this.email,this.password).subscribe({
      next: (res) => {
        console.log(res);
        if(res.token !== null){
          localStorage.setItem('tokenFinanceiro',res.token);
          localStorage.setItem('emailFinanceiro',this.email);
          localStorage.setItem('userIdFinanceiro',res.userId);

          setTimeout(() => {
            window.location.href = 'home';  
          }, 2000);
        }
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {

      }
    })
  }
}
