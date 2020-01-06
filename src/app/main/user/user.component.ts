import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public pageIndex: number = 1;
  public pageSize: number = 1;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public users :any;

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    return this._dataService.get('/api/appUser/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize
      + '&filter=' + this.filter).subscribe(res => {
              this.users = res['Items'];
      })
  }

  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.getUser();
  }

}
