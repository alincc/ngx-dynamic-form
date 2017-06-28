import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Control } from './../models/control';
import { ControlConfig } from './../models/control-config';

@Component({
  selector: 'datetime-control',
  template:
    `<control-wrapper
      [config]="config"
      [group]="group"
      [errors]="errors"
      [disabled]="disabled"
      [formGroup]="group">

      <input
        datetime
        class="form-control"
        type="text"
        [attr.disabled]="disabled === true ? true : null"
        [attr.id]="config.name"
        [attr.placeholder]="config.placeholder"
        [ngClass]="[config.controlClass || '']"
        [attr.name]="config.name"
        [value]="group.get(config.name).value"
        [formControlName]="config.name">

    </control-wrapper>`,
  styleUrls: [
    './datetime-control.component.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class DatetimeControlComponent implements Control, OnInit {
  public config: ControlConfig;
  public group: FormGroup;
  public errors: Object = {};
  public disabled = true;

  public constructor() { }

  public ngOnInit() { }
}
