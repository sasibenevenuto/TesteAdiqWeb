import { HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.services';
import { ResetSenhaModalComponent } from '../reset-senha-modal/reset-senha-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoadingResults: boolean = false;

  @Input() error: string | null;
  @Output() submitEM = new EventEmitter();

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public userService: UserService,
    public snackBar: MatSnackBar) {
    if (localStorage.getItem('mpManagerToken'))
      this.router.navigate(['/login-sucesso']);
  }

  ngOnInit() {
  }

  onSubmit(post) {
    this.isLoadingResults = true;
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }

    this.userService.tokenUsuario(post.username).subscribe(token => {
      this.userService.login(post.username, post.password, token["token"]).subscribe((result) => {
        localStorage.setItem("email", post.username);
        localStorage.setItem("nomeUsuario", result["nomeUsuario"]);
        localStorage.setItem('mpManagerToken', result["token"]);
        this.isLoadingResults = false;
        this.router.navigate(['/login-sucesso']);
      },
        (err) => {
          this.isLoadingResults = false;
          this.snackBar.open('Usuario ou Senha Inválida', 'Ocultar', {
            duration: 5000,
          });
        });
    },
      (err) => {
        this.isLoadingResults = false;
        this.snackBar.open('Usuario ou Senha Inválida', 'Ocultar', {
          duration: 5000,
        });
      });
  }

  resetSenha() {
    const dialogRef = this.dialog.open(ResetSenhaModalComponent, {
      disableClose: false,
      width: '50%',
      data: { parametro: null }
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
