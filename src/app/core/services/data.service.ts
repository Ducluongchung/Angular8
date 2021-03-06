import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { AuthenService } from './authen.service';
import { UtilityService } from './utility.service';
import { SystemConstants } from '../common/system.constant';
import { catchError } from 'rxjs/operators';
import { MessageContstants } from '../common/message.constant';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

    private headers = new HttpHeaders();
    constructor(private _http: HttpClient,
    private _authenService: AuthenService,
    private _notificationService: NotificationService,
    private _utilityService: UtilityService) {
      this.headers = this.headers.set('Content-Type', 'application/json');
      this.headers = this.headers.set("Authorization", "Bearer " + _authenService.getLoggedInUser().access_token);
  }
  // get api
  get(uri: string) {
    return this._http.get(SystemConstants.BASE_API + uri, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // post api
  post(uri: string, data?: any) {
    return this._http.post(SystemConstants.BASE_API + uri, data, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // put api
  put(uri: string, data?: any) {
    return this._http.put(SystemConstants.BASE_API + uri, data, { headers: this.headers })
  }

  // delete api
  delete(uri: string, key: string, id: string) {
    return this._http.delete(SystemConstants.BASE_API + uri + "/?" + key + "=" + id, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // delete multiParams
  deleteWithMultiParams(uri: string, params) {
    var paramStr: string = '';
    for (let param in params) {
      paramStr += param + "=" + params[param] + '&';
    }
    return this._http.delete(SystemConstants.BASE_API + uri + "/?" + paramStr, { headers: this.headers })
      .pipe(catchError(this.handleError));

  }

  postFile(uri: string, data?: any) {
    let newHeader = new HttpHeaders();
    newHeader.set("Authorization", "Bearer " + this._authenService.getLoggedInUser().access_token);
    return this._http.post(SystemConstants.BASE_API + uri, data, { headers: newHeader })
      .pipe(catchError(this.handleError));
  }

  // handleError
  public handleError(error: any) {
    if (error.status == 401) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._notificationService.printErrorMessage(MessageContstants.LOGIN_AGAIN_MSG);
      this._utilityService.navigateToLogin();
    }
    else if (error.status == 403) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._notificationService.printErrorMessage(MessageContstants.FORBIDDEN);
      this._utilityService.navigateToLogin();
    }
    else {
      let errMsg = JSON.parse(error._body).Message;
      this._notificationService.printErrorMessage(errMsg);
      return Observable.throw(errMsg);
    }
  }
}
