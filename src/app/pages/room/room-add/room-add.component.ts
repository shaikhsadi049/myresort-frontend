import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, startWith, switchMap } from 'rxjs/operators';
import { AsyncService } from 'src/app/shared/services/async.service';
import { ResortService } from '../../resort/service/resort.service';

@Component({
  selector: 'app-room-add',
  templateUrl: './room-add.component.html',
  styleUrls: ['./room-add.component.scss'],
})
export class RoomAddComponent implements OnInit {
  formId = 'roomsAddForm';
  form: FormGroup;

  filteredResort: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    private resortService: ResortService,
    private asyncService: AsyncService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      resortId: [''],
      resortName: [''],
      roomName: [''],
      description: [''],
      price: [''],
      isVatIncluded: [''],
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

  get isVatIncluded() {
    return this.form.get('isVatIncluded');
  }

  onSelectResort(value: any) {
    this.resortId.patchValue(value._id);
    this.resortName.patchValue(value.resortName);

    console.log(this.form.value);
  }

  onAddRooms = () => {};

  addroom() {}
}
