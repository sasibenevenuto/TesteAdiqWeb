import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.services';

interface BreadCrumbItem {
  text: string;
  link?: string;
}

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent implements OnInit {

  @Input() itens: Array<BreadCrumbItem> = [];
  @Input() usuario: string = '';

  constructor(
    public userService: UserService,
    public snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
  }

  isTheLastItem(item: BreadCrumbItem): boolean {
    const index = this.itens.indexOf(item);
    return index + 1 == this.itens.length;
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
