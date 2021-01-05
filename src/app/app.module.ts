import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './shared/navbar/navbar.component';

import { BreadCrumbComponent } from './shared/bread-crumb/bread-crumb.component';
import { PageHeaderComponent } from './shared/page-header/page-header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { UserService } from './services/user.services';
import { AuthenticationInterceptorService } from './services/authenticationInterceptor.service';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { LoginComponent } from './pages/usuario/login/login.component';
import { CadastroComponent } from './pages/usuario/cadastro/cadastro.component';
import { ResetSenhaComponent } from './pages/usuario/reset-senha/reset-senha.component';
import { ResetSenhaModalComponent } from './pages/usuario/reset-senha-modal/reset-senha-modal.component';
import { Router } from '@angular/router';
import { LoginSucessoComponent } from './pages/usuario/login-sucesso/login-sucesso.component';
//import JwtModule from 'jwt-decode';

registerLocaleData(localePt);

export function authInterceptorFactory(router: Router, injector: Injector) {
  return new AuthenticationInterceptorService(router,injector);
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,    
    BreadCrumbComponent,
    PageHeaderComponent,
    LoginComponent,
    CadastroComponent,
    ResetSenhaComponent,
    ResetSenhaModalComponent,
    LoginSucessoComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: authInterceptorFactory,
      multi: true,
      deps: [Router, Injector]
    },
    //useClass: AuthenticationInterceptorService, multi: true },
    //useValue: 'pt-BR',
    UserService
  ],
  bootstrap: [AppComponent]
  //entryComponents: [PropostaItemComponent]
})
export class AppModule { }
