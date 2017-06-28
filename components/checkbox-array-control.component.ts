import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { Control } from './../models/control';
import { ControlConfig } from './../models/control-config';

@Component({
  selector: 'checkbox-array-control',
  template:
    `<control-wrapper
      [config]="config"
      [group]="group"
      [errors]="errors"
      [disabled]="disabled"
      [formGroup]="group">

      <ng-container *ngFor="let option of config.options">
        <div class="checkbox">
          <label>
            <input
                type="checkbox"
                [attr.name]="config.name"
                [checked]="group.get(config.name).value && group.get(config.name).value.indexOf(option.value) >= 0"
                [attr.disabled]="disabled === true ? true : null"
                [value]="option.value"
                (click)="toggleArrayFieldValue(config.name, $event.target.value)">
            {{ option.label }}
          </label>
        </div>
      </ng-container>

    </control-wrapper>`,
  styles: [`:host { display: block; }`]
})
export class CheckboxArrayControlComponent implements Control, OnInit {
  public config: ControlConfig;
  public group: FormGroup;
  public errors: Object = {};
  public disabled = true;

  public constructor() { }

  public ngOnInit() { }

  public toggleArrayFieldValue(field: any, value: any) {
    const index = this.group.get(field).value.indexOf(value);
    const selectedOptions = _.set({}, field, _.cloneDeep(this.group.get(field).value));

    if (index > -1) {
      selectedOptions[field].splice(index, 1);
    } else {
      selectedOptions[field].push(value);
    }

    this.group.patchValue(selectedOptions);
    this.group.markAsDirty();
  }
}
