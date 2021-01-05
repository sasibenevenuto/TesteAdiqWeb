import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-reset-senha',
  templateUrl: './reset-senha.component.html',
  styleUrls: ['./reset-senha.component.scss']
})
export class ResetSenhaComponent implements OnInit {

  formGroup: FormGroup;
  isLoadingResults: boolean = false;
  post: any = '';
  token: any = '';

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    public snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    localStorage.setItem("email", "");
    localStorage.setItem("nomeUsuario", "");
    localStorage.setItem('mpManagerToken', "");
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
    console.log(this.token);
    this.createForm();
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'password': [null, [Validators.required, this.checkPassword]],
      'validate': ''
    });
  }

  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.formGroup.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }

  onSubmit(post) {
    this.isLoadingResults = true;
    var user = {
      senha: post.password,
      email: post.email,
      token: this.token
    }

    this.userService.resetSenhaUsuario(user).subscribe((result) => {
      this.isLoadingResults = false;
      this.snackBar.open('Senha cadastrada com sucesso!', 'Ocultar', {
        duration: 5000,
      });
      this.router.navigate(['/login']);
    },
      (err) => {
        this.isLoadingResults = false;
        this.snackBar.open("Erro ao alterar senha!", 'Ocultar', {
          duration: 5000,
        });
      });
  }

}
