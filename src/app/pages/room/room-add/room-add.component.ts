import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { debounceTime, startWith, switchMap } from 'rxjs/operators';
import { AsyncService } from 'src/app/shared/services/async.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { ResortService } from '../../resort/service/resort.service';
import { RoomService } from '../service/room.service';

@Component({
  selector: 'app-room-add',
  templateUrl: './room-add.component.html',
  styleUrls: ['./room-add.component.scss'],
})
export class RoomAddComponent implements OnInit {
  formId = 'roomsAddForm';
  form: FormGroup;
  roomList: any = [];
  addRoomSub: Subscription;

  defaultImage = '/assets/images/avatar_square_blue.png';
  roomPicture: string;
  defaultAvatar: string = this.defaultImage;

  filteredResort: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    private resortService: ResortService,
    private roomService: RoomService,
    private asyncService: AsyncService,
    private commonService: CommonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      resortId: ['', Validators.required],
      resortName: ['', Validators.required],
      roomName: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      imagePath: ['asdas', Validators.required],
      isVatIncluded: [false, Validators.required],
    });

    this.commonService.setUiInfo({
      formId: this.formId,
      goBackPath: '/room',
      title: 'Room Add',
    });

    this.filteredResort = this.resortName.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      switchMap((value: string) => {
        if (value !== '') {
          this.asyncService.start();
          return this.resortService.getResortAutoComplete(value);
        } else {
          return of(null);
        }
      })
    );
    this.filteredResort.subscribe((data) => {
      this.asyncService.finish();
    });
  }

  get resortId() {
    return this.form.get('resortId');
  }
  get resortName() {
    return this.form.get('resortName');
  }
  get roomName() {
    return this.form.get('roomName');
  }
  get description() {
    return this.form.get('description');
  }
  get price() {
    return this.form.get('price');
  }
  get imagePath() {
    return this.form.get('imagePath');
  }
  get isVatIncluded() {
    return this.form.get('isVatIncluded');
  }

  onSelectResort(value: any) {
    this.resortId.patchValue(value._id);
    this.resortName.patchValue(value.resortName);
  }

  addroom() {
    if (!this.form.valid) {
      this.commonService.showErrorMsg(`ALL Fields Required`);
      return;
    }

    this.roomList.push({
      resortId: this.resortId.value, // or this.form.get('resortId').value
      resortName: this.resortName.value, // or this.form.get('resortId').value
      roomName: this.roomName.value,
      description: this.description.value,
      price: this.price.value,
      isVatIncluded: this.isVatIncluded.value,
      imagePath: this.imagePath.value,
    });

    // this.form.patchValue({
    //   roomName: '',
    //   description: '',
    //   price: '',
    //   isVatIncluded: false,
    // });
    //  OR
    this.roomName.patchValue('');
    this.description.patchValue('');
    this.price.patchValue('');
    this.isVatIncluded.patchValue(false);
  }

  deleteRoom(value: any, index: any) {
    this.roomList = this.roomList.filter(
      (cs: any) => cs.roomName !== value.roomName
    );
  }

  onAddRooms = () => {
    if (!this.roomList.length) {
      this.commonService.showErrorMsg(`Room Not Found`);
      return;
    }

    this.addRoomSub = this.roomService
      .roomAdd({ roomList: this.roomList })
      .subscribe(
        (response) => {
          if (response) {
            this.commonService.showSuccessMsg(`Rooms Added Successfully`);
            this.router.navigate(['/room']);
          }
        },
        (err) => {
          this.commonService.showErrorMsg(err);
        }
      );
  };

  ngOnDestroy(): void {
    if (this.addRoomSub) {
      this.addRoomSub.unsubscribe();
    }
  }
}
