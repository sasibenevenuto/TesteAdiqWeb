import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './pages/usuario/cadastro/cadastro.component';
import { LoginSucessoComponent } from './pages/usuario/login-sucesso/login-sucesso.component';
import { LoginComponent } from './pages/usuario/login/login.component';
import { ResetSenhaComponent } from './pages/usuario/reset-senha/reset-senha.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'login-sucesso', component: LoginSucessoComponent },
  { path: 'reset-senha/:token', component: ResetSenhaComponent },
  { path: 'cadastroDeUsuario', component: CadastroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
