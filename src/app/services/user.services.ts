import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';

@Injectable()
export class UserService {

    url = `${environment.urlApi}`;
    tokenIntranet = `${environment.tokenIntranet}`

    constructor(
        private http: HttpClient
    ) { }

    login(login: string, senha: string, tokenUsuario: string): Observable<any> {

        const hashSenha = Base64.stringify(hmacSHA512(tokenUsuario, this.tokenIntranet));

        var loginModel = {
            login: login,
            senha: senha,
            TokenIntranet: hashSenha
        }

        return this.http.post<any>(`${this.url}/api/Usuario/login`, loginModel);
    }

    loginChavePublica(): Observable<any> {

        const hash = Base64.stringify(hmacSHA512("ChavePublica", "bb0a1fbe-6f25-4737-bdb7-375b222b8dea"));

        var siganture = {
            key: hash
        };

        return this.http.post<any>(`${this.url}/api/Usuario/login/ChavePublica`, siganture);
    }

    cadastrarNovo(usuario: any): Observable<any> {
        return this.http.post(`${this.url}/api/Usuario/login/AddUsuario`, usuario);
    }

    tokenUsuario(login: string, cpf: string = null): Observable<any> {
        return this.http.post(`${this.url}/api/Usuario/login/TokenUsuario/${cpf}/${login}`, {});
    }

    resetSenhaUsuario(usuario: any): Observable<any> {
        return this.http.post(`${this.url}/api/Usuario/login/ResetSenha`, usuario);
    }

    emailResetSenhaUsuario(email: any): Observable<any> {
        return this.http.put(`${this.url}/api/Usuario/login/EmailResetSenha/${email}`, {});
    }

    logout(email: string): Observable<any> {
        return this.http.put(`${this.url}/api/Usuario/Login/Logout/${email}`, {});
    }
}