import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { from } from 'rxjs';
import { SystemConstants } from '../common/system.constant';
import { LogginUser } from '../domain/Loggedin.user';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  constructor(private _http: HttpClient) { }

  login(username: string, password: string) {
    let body = "userName=" + encodeURIComponent(username) +
      "&password=" + encodeURIComponent(password) +
      "&grant_type=password";
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    var promise = new Promise((resolve, reject) => {
      this._http.post(SystemConstants.BASE_API + "/api/oauth/token", body, { headers: headers }).subscribe((response: any) => {
        let user: LogginUser = response.json();
        console.log(user);
        if (user && user.access_token) {
          localStorage.removeItem(SystemConstants.CURRENT_USER);
          localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(user));
          resolve(true);
        }
        else {
          reject(false);
        }
      }, error => {
        reject(error);
      });
    });
    return promise;
  }

  logout() {
    localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(SystemConstants.CURRENT_USER));
  }

  checkIsAuthenticate(): boolean {
    let user = localStorage.removeItem(SystemConstants.CURRENT_USER);
    if (user != null) { 
      return true;
    }
    else {
      return false;
    }
  }

  getLoggedInUser(): LogginUser {
    let user: LogginUser;
    if (this.checkIsAuthenticate) {
      var userData = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER))
      user = new LogginUser(userData.access_token, userData.username, userData.fullname, userData.email, userData.avartar);
    }
    else {
      user = null;
    }
    return user;
  }
}
