import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { Routes, RouterModule } from '@angular/router';
import {NgbModule, NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';

const userRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: UserComponent }
]


@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    NgbModule,
    NgbPaginationModule,
    PaginationModule,
    NgbAlertModule,
    ModalModule,
    RouterModule.forChild(userRoutes)
  ],
  providers:[DataService,NotificationService]

})
export class UserModule { }
