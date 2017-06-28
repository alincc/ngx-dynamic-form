import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Control } from './../models/control';
import { ControlConfig } from './../models/control-config';

@Component({
  selector: 'input-control',
  template:
    `<control-wrapper
      [config]="config"
      [group]="group"
      [errors]="errors"
      [disabled]="disabled"
      [formGroup]="group">
  
      <textarea
        class="form-control"
        [attr.disabled]="disabled === true ? true : null"
        [attr.id]="config.name"
        [attr.placeholder]="config.placeholder"
        [ngClass]="[config.controlClass || '']"
        [attr.name]="config.name"
        [formControlName]="config.name">
      </textarea>

    </control-wrapper>`,
  styles: [`:host { display: block; }`]
})
export class TextAreaControlComponent implements Control, OnInit {
  public config: ControlConfig;
  public group: FormGroup;
  public errors: Object = {};
  public disabled = true;

  public constructor() { }

  public ngOnInit() { }
}
