import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  user: any;
  role: any;

constructor(private http: HttpClient) { }

login(model: any) {
  return this.http.post(this.baseUrl + 'login', model)
    .pipe(
      map((response: any) => {
        this.user = response;
        if (this.user) {
          localStorage.setItem('token', this.user.token);
          this.decodedToken = this.jwtHelper.decodeToken(this.user.token);
          this.role = this.decodedToken.role;
          //console.log(this.role);
          //console.log(this.decodedToken);
        }
      })
    );
}

register(model: any) {
  return this.http.post(this.baseUrl + 'register', model)
    .pipe(
      map((response: any) => {
        const user = response;
        if (user) {}
      })
    );
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

isAdmin() {
  this.role = this.decodedToken.role;
  if (this.role === 'admin') {
    return true;
  }

  return false;
}

}
