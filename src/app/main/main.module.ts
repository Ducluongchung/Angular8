import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { Routes, RouterModule} from '@angular/router';
import {mainRoutes} from './main.routes';
import {UserModule} from './user/user.module'
import {HomeModule} from './home/home.module'
import { AuthenService } from '../core/services/authen.service';
import { UtilityService } from '../core/services/utility.service';
@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    UserModule,
    HomeModule,
    RouterModule.forChild(mainRoutes)
  ],
  providers:[
    AuthenService,
    UtilityService
  ]
})
export class MainModule { }
