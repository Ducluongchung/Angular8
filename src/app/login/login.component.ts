import { Component, OnInit, OnDestroy,Renderer2 } from '@angular/core';
import { NotificationService } from '../core/services/notification.service';
import { AuthenService } from '../core/services/authen.service';
import { Router } from "@angular/router";
import { UrlConstants } from '../core/common/url.constant';
import { MessageContstants } from '../core/common/message.constant';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy  {

  loading = false;
  model: any = {};
  constructor(private renderer: Renderer2,
    private _notificationService: NotificationService,
    private _authenService: AuthenService,
    private _router: Router,
  ) {
    this.renderer.addClass(document.body, 'login');
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'login');
  }
  login() {
    this.loading = true;
    this._authenService.login(this.model.username, this.model.password).then(data => {
      this._router.navigate([UrlConstants.HOME]);
    }).catch(
      error => {
        this._notificationService.printErrorMessage(MessageContstants.SYSTEM_ERROR_MSG);
        this.loading = false;
      }
    );

  }
}
