import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-resort-add',
  templateUrl: './resort-add.component.html',
  styleUrls: ['./resort-add.component.scss'],
})
export class ResortAddComponent implements OnInit {
  formId = 'addRessort';
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      resortName: ['', Validators.required],
    });
  }

  get resortName() {
    return this.form.get('resortName');
  }

  onAddResort(value: any) {
    console.log(value, `form-values`);
  }
}
