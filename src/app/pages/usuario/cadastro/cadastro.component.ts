import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  formGroup: FormGroup;
  titleAlert: string = 'Campo de preenchimento obrigatório';
  post: any = '';
  isLoadingResults: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {
    localStorage.setItem("email", "");
    localStorage.setItem("nomeUsuario", "");
    localStorage.setItem('mpManagerToken', "");
  }

  ngOnInit() {
    this.createForm();
    this.setChangeValidate()
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail],
      'name': [null, Validators.required],
      //'password': [null, [Validators.required, this.checkPassword]],
      'cpf': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(14)]],
      'validate': ''
    });
  }

  setChangeValidate() {
    this.formGroup.get('validate').valueChanges.subscribe(
      (validate) => {
        if (validate == '1') {
          this.formGroup.get('name').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = "Mínimo de 3 caracteres";
        } else {
          this.formGroup.get('name').setValidators(Validators.required);
        }
        this.formGroup.get('name').updateValueAndValidity();
      }
    )
  }

  get name() {
    return this.formGroup.get('name') as FormControl
  }

  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  checkInUseEmail(control) {
    // mimic http database access
    let db = ['tony@gmail.com'];
    return new Observable(observer => {
      setTimeout(() => {
        let result = (db.indexOf(control.value) !== -1) ? { 'alreadyInUse': true } : null;
        observer.next(result);
        observer.complete();
      }, 4000)
    })
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Campo de preenchimento obrigatório' :
      this.formGroup.get('email').hasError('pattern') ? 'email inválido' :
        this.formGroup.get('email').hasError('alreadyInUse') ? 'email já em uso' : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'Campo de preenchimento obrigatório mínimo de 8 caracteres (Utilize caracteres alfanuméricas, letras maiúsculas e minúsculas, números e símbolos.)' :
      this.formGroup.get('password').hasError('requirements') ? 'Utilize caracteres alfanuméricas, letras maiúsculas e minúsculas, números e símbolos.' : '';
  }

  onSubmit(post) {
    this.isLoadingResults = true;
    var user = {
      cpf: post.cpf,
      senha: 'Adiq!@2020',
      email: post.email,
      nome: post.name
    }

    this.userService.cadastrarNovo(user).subscribe((result) => {
      if (result.status) {
        this.isLoadingResults = false;
        this.snackBar.open(result.resposta, 'Ocultar', {
          duration: 5000,
        });
      }
      else {
        this.snackBar.open('Usuário cadastrado com sucesso, verifique seu email para cadastro da senha!', 'Ocultar', {
          duration: 10000,
        });
        this.router.navigate(['/login']);
      }
    },
      (err) => {
        this.isLoadingResults = false;
        this.snackBar.open(err.message, 'Ocultar', {
          duration: 5000,
        });
      });
  }

}
