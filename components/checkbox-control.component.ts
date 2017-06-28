import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { Control } from './../models/control';
import { ControlConfig } from './../models/control-config';

@Component({
  selector: 'checkbox-control',
  template:
    `<control-wrapper
      [config]="config"
      [group]="group"
      [errors]="errors"
      [disabled]="disabled"
      [formGroup]="group">

      <label class="switch">
        <input
          type="checkbox"
          [attr.name]="config.name"
          [checked]="group.get(config.name).value == 1 || group.get(config.name).value === true"
          [attr.disabled]="disabled === true ? true : null"
          [value]="true"
          [formControlName]="config.name">
        <i></i>
      </label>

    </control-wrapper>`,
  styles: [`
    :host { display: block; }
    .switch input {
        display: none;
    }
    .switch i {
        display: inline-block;
        cursor: pointer;
        padding-right: 20px;
        transition: all ease 0.2s;
        -webkit-transition: all ease 0.2s;
        border-radius: 20px;
        box-shadow: inset 0 0 1px rgba(0,0,0,.5);
    }
    .switch i:before {
        display: block;
        content: '';
        width: 25px;
        height: 25px;
        border-radius: 20px;
        background: white;
        box-shadow: 0 1px 2px rgba(0,0,0,.5);
    }
    .switch :checked + i {
        padding-right: 0;
        padding-left: 20px;
        box-shadow: inset 0 0 1px rgba(0,0,0,.5), inset 0 0 40px rgb(0, 114, 186);
        -webkit-box-shadow: inset 0 0 1px rgba(0,0,0,.5), inset 0 0 40px rgb(0, 114, 186);
    }

    .switch.red :checked + i {
        box-shadow: inset 0 0 1px rgba(0,0,0,.5), inset 0 0 40px red;
        -webkit-box-shadow: inset 0 0 1px rgba(0,0,0,.5), inset 0 0 40px red;
    }
    `]
})
export class CheckboxControlComponent implements Control, OnInit {
  public config: ControlConfig;
  public group: FormGroup;
  public errors: Object = {};
  public disabled = true;

  public constructor() { }

  public ngOnInit() { }
}
