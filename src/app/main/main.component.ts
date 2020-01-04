import { Component, OnInit } from '@angular/core';
import { SystemConstants } from '../core/common/system.constant';
import { UtilityService } from '../core/services/utility.service';
import { UrlConstants } from '../core/common/url.constant';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
    this.utilityService.navigate(UrlConstants.LOGIN);
  }
}
