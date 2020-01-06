import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { Routes, RouterModule } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';

export const roleRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: RoleComponent }
]
@NgModule({
  declarations: [RoleComponent],
  imports: [
    CommonModule,
    ModalModule,
    PaginationModule.forRoot(),
    RouterModule.forChild(roleRoutes)
  ],
  providers:[DataService,NotificationService]
})
export class RoleModule { }
