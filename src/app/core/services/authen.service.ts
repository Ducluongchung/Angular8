import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  constructor() { }

  login(userName: string, passWord:string){

  }

  logout(){

  }

  checkIsAuthenticate(): boolean{
    return true;
  }

  getLoginUser(): any{
    return null;
  }
}
