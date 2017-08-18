import { Component, OnInit, Input } from '@angular/core';
import { Control } from 'app/dynamic-form/models/control';
import { ControlConfig } from 'app/dynamic-form/models/control-config';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'control-wrapper',
  template:
    `<div
      class="form-group"
      [class.has-success]="group.get(config.name).valid && group.get(config.name).touched"
      [class.has-error]="(!group.get(config.name).valid && group.get(config.name).touched) || errors[config.name]"
      [ngClass]="[config.mainWrapperClass || '']">

      <label
        class="control-label"
        [attr.for]="config.name"
        [ngClass]="[config.labelClass || '']">
        {{ config.label }}
      </label>

      <div [ngClass]="[config.controlWrapperClass || '']">

        <ng-content></ng-content>

      </div>
    </div>`
})
export class ControlWrapperComponent implements Control, OnInit {
  @Input()
  public config: ControlConfig;

  @Input()
  public group: FormGroup;

  @Input()
  public errors: any;

  @Input()
  public disabled = true;

  constructor() { }

  ngOnInit() { }
}
