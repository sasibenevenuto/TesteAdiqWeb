import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-reset-senha-modal',
  templateUrl: './reset-senha-modal.component.html',
  styleUrls: ['./reset-senha-modal.component.scss']
})
export class ResetSenhaModalComponent implements OnInit {

  formGroup: FormGroup;
  isLoadingResults: boolean = false;
  post: any = '';
  model: any;

  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<ResetSenhaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.model = data.parametro;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'validate': ''
    });
  }

  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  fechar() {
    this.dialogRef.close();
  }

  onSubmit(post) {
    this.isLoadingResults = true;

    this.userService.emailResetSenhaUsuario(post.email).subscribe((result) => {
      this.isLoadingResults = false;
      this.snackBar.open('Link para alteração de senha enviado com sucesso!', 'Ocultar', {
        duration: 5000,
      });
      this.fechar();
      //this.router.navigate(['/login']);
    },
      (err) => {
        this.isLoadingResults = false;
        this.snackBar.open(err.message, 'Ocultar', {
          duration: 5000,
        });
      });
  }

}
