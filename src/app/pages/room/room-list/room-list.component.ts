import { Component, OnInit } from '@angular/core';
import { AsyncService } from 'src/app/shared/services/async.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit {
  constructor(
    private asyncService: AsyncService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    // this.commonService.setUiInfo({
    //   refresh: this.getRoomList,
    //   title: 'Room List',
    // });
  }

  getRoomList = () => {};
}
