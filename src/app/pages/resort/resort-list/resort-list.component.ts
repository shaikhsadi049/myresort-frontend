import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
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

  constructor(private resortService: ResortService) {}

  ngOnInit(): void {
    this.getResortList();
  }

  getResortList() {
    this.resortViewSub = this.resortService.resortList().subscribe((data) => {
      if (data && data.data.length) {
        this.resortListArr = data.data;
        // console.log(data);
        // this.resortListArr = Array.of(this.resortListArr);
        this.totalRecords = this.resortListArr.length;
        console.log(this.resortListArr);
      }
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
