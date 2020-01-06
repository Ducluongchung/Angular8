import { Component, OnInit } from '@angular/core';
import { SystemConstants } from '../core/common/system.constant';
import { UtilityService } from '../core/services/utility.service';
import { UrlConstants } from '../core/common/url.constant';
import { LogginUser } from '../core/domain/loggedin.user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private user : LogginUser;
  constructor(
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
  }

  logout() {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
    this.utilityService.navigate(UrlConstants.LOGIN);
  }
}
