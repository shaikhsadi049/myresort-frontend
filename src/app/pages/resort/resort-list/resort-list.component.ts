import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { AsyncService } from 'src/app/shared/services/async.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { Resort } from '../model/resort.model';
import { ResortService } from '../service/resort.service';

@Component({
  selector: 'app-resort-list',
  templateUrl: './resort-list.component.html',
  styleUrls: ['./resort-list.component.scss'],
})
export class ResortListComponent implements OnInit {
  resortListArr: any[];
  totalRecords = 0;
  myControl = new FormControl();
  resortViewSub: Subscription;

  //  resortList: Resort = {
  //    resortName: '',
  //    address: '',
  //    cellNo: '',
  //    email: '',
  //    isWifiExist: false,
  //    isParkingExist: false,
  //    isOutdoorPoolExist: false,
  //    isLaundryExist: false,
  //    isBBQExist: false
  //  };

  constructor(
    private resortService: ResortService,
    private asyncService: AsyncService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.commonService.setUiInfo({
      goBackPath: '/resort',
      title: 'Resort Details',
    });
    this.getResortList();
  }

  getResortList() {
    this.asyncService.start();
    this.resortViewSub = this.resortService.resortList().subscribe((data) => {
      if (data && data.data.length) {
        this.resortListArr = data.data;
        // console.log(data);
        // this.resortListArr = Array.of(this.resortListArr);
        this.totalRecords = this.resortListArr.length;
        console.log(this.resortListArr);
      }
      this.asyncService.finish();
    });
  }

  Search(e: string) {}

  deleteItem(id: string): void {}

  ngOnDestroy() {
    if (this.resortViewSub) {
      this.resortViewSub.unsubscribe();
    }
  }
}
