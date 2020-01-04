import { Component, OnInit } from '@angular/core';
import { LogginUser } from 'src/app/core/domain/loggedin.user';
import { SystemConstants } from 'src/app/core/common/system.constant';
import { UrlConstants } from 'src/app/core/common/url.constant';
import { UtilityService } from 'src/app/core/services/utility.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private utilityService : UtilityService) { }

  public user : LogginUser;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
  }
}
