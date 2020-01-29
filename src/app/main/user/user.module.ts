import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { Routes, RouterModule } from '@angular/router';
import {NgbModule, NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { Daterangepicker } from 'ng2-daterangepicker';

const userRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: UserComponent }
]


@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    MultiselectDropdownModule,
    NgbModule,
    Daterangepicker,
    NgbPaginationModule,
    PaginationModule,
    NgbAlertModule,
    ModalModule,
    FormsModule,
    RouterModule.forChild(userRoutes)
  ],
  providers:[DataService,NotificationService]

})
export class UserModule { }
