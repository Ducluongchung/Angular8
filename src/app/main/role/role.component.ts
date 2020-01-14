import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { MessageContstants } from 'src/app/core/common/message.constant';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  @ViewChild('AddEditModal', { static: false }) childModal: ModalDirective;
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public roles: any;
  public entity: any;
  public action: string;

  constructor(private _dataService: DataService, private _notificationService: NotificationService) { }

  ngOnInit() {
    this.loadData();
  }

  search(){

  }

  loadData() {
    return this._dataService.get('/api/appRole/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter='
      + this.filter).subscribe((res: any) => {
        this.roles = res['Items'];
        this.pageIndex = res.PageIndex;
        this.pageSize = res.PageSize;
        this.totalRow = res.TotalRows;
      })
  }
  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }

  //show modal
  showChildModal(): void {
    this.entity = {};
    this.action = 'Thêm mới';
    this.childModal.show();
  }

  // ẩn modal
  hideChildModal(): void {
    this.childModal.hide();
  }

  // Click Edit Modal
  showEditModal(Id: any) {
    this.loadRole(Id)
    this.action = 'Cập nhật';
    this.childModal.show();
  }

  // find Role follow Id

  loadRole(Id: any) {
    this._dataService.get('/api/appRole/detail/' + Id).subscribe((response: any) => {
      this.entity = response;
    })
  }

  saveChange(valid: boolean) {
    if (valid) {
      if (this.entity.Id == undefined) {
        this._dataService.post('/api/appRole/add', JSON.stringify(this.entity)).subscribe((response: any) => {
          this.loadData();
          this.hideChildModal();
          this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
        }, error => this._dataService.handleError(error));
      }
      else {
        this._dataService.put('/api/appRole/update', JSON.stringify(this.entity)).subscribe((response: any) => {
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
    this._dataService.delete('/api/appRole/delete', 'id', id).subscribe((response: Response) => {
      this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.loadData();
    });
  }

}
