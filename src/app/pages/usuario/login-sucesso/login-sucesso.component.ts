import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-login-sucesso',
  templateUrl: './login-sucesso.component.html',
  styleUrls: ['./login-sucesso.component.scss']
})
export class LoginSucessoComponent implements OnInit {

  constructor(public snackBar: MatSnackBar,public userService: UserService,private router: Router) {
    if (!localStorage.getItem('mpManagerToken'))
      this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }

  sair() {
    this.userService.logout(localStorage.getItem('email')).subscribe(result =>{
      localStorage.setItem("email", "");
      localStorage.setItem("nomeUsuario", "");
      localStorage.setItem('mpManagerToken', "");
      this.router.navigate(['/login']);
    },
    (err) => {      
      this.snackBar.open(err.message, 'Ocultar', {
        duration: 5000,
      });
    });
    
  }

}
