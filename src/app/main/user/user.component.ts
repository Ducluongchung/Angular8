import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { MessageContstants } from 'src/app/core/common/message.constant';
import { NotificationService } from 'src/app/core/services/notification.service';
import * as moment from 'moment';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('AddEditModal', { static: false }) childModal: ModalDirective;
  public myRoles: string[] = [];
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public users: any;
  public action: string;
  public entity: any;
  public allRoles: any[];
  constructor(private _dataService: DataService, private _notificationService: NotificationService) { }

  public dateOptions: any = {
    locale: { format: 'DD/MM/YYYY' },
    alwaysShowCalendars: false,
    singleDatePicker: true
  }

  ngOnInit() {
    this.loadData();
    this.loadRoles()
  }

  public selectGender(event) {
    this.entity.Gender = event.target.value
  }

  loadRoles() {
    this._dataService.get('/api/appRole/getlistall').subscribe((response: any[]) => {
      this.allRoles = [];
      for (let role of response) {
        this.allRoles.push({ id: role.Name, name: role.Description });
      }
    }, error => this._dataService.handleError(error));
  }

  loadData() {
    return this._dataService.get('/api/appUser/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter='
      + this.filter).subscribe((res: any) => {
        this.users = res['Items'];
        this.pageIndex = res.PageIndex;
        this.pageSize = res.PageSize;
        this.totalRow = res.TotalRows;
      }
      )
  }

  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData()
  }

  //show modal
  showChildModal(): void {
    this.action = 'Thêm mới';
    this.entity = {};
    this.childModal.show();
  }

  // ẩn modal
  hideChildModal(): void {
    this.childModal.hide();
  }

  // Click Edit Modal
  showEditModal(Id: any) {
    this.action = 'Cập nhật';
    this.loadUserDetail(Id);
    this.childModal.show();
  }

  loadUserDetail(Id: any) {
    this._dataService.get('/api/appUser/detail/' + Id).subscribe((response: any) => {
      this.entity = response;
      this.entity.BirthDay = moment().format('DD/MM/YYYY');
      this.myRoles = this.entity.Roles;
    })
  }

  saveChange(valid: boolean) {
    if (valid) {
      if (this.entity.Id == undefined) {
        this.entity.Roles = this.myRoles;
        this._dataService.post('/api/appUser/add', JSON.stringify(this.entity)).subscribe((response: any) => {
          this.loadData();
          this.hideChildModal();
          this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
        }, error => this._dataService.handleError(error));
      }
      else{
        this._dataService.put('/api/appUser/update', JSON.stringify(this.entity)).subscribe((response: any) => {
          this.loadData();
          this.hideChildModal();
          this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
        }, error => this._dataService.handleError(error));
      }
    }
  }

  deleteItem(id: any) {
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => this.deleteItemConfirm(id));
  }
  deleteItemConfirm(id: any) {
    this._dataService.delete('/api/appUser/delete', 'id', id).subscribe((response: Response) => {
      this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.loadData();
    });
  }

  public selectedDate(value: any) {
    this.entity.BirthDay = moment(value.end._d).format('DD/MM/YYYY');
  }

}
