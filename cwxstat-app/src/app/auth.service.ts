import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;

}

interface EmailAuthResponse {
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  signup(email: string, password: string) {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDyzPpGkmnOUOcurGvTr-QBHBtbtaHMkTY';
    return this.http.post<AuthResponseData>(url, {
      email: email,
      password: password,
      returnSecureToken: true
    });
  }

  emailVerification(idToken: string){
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDyzPpGkmnOUOcurGvTr-QBHBtbtaHMkTY';
    return this.http.post<EmailAuthResponse>(url, {
      requestType: 'VERIFY_EMAIL',
      idToken: idToken
    });
  }
}
