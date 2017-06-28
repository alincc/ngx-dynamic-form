import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ControlConfig } from "app/dynamic-form/models/control-config";

@Component({
  selector: 'dynamic-form-fields',
  template: `
    <div>
      <ng-container *ngFor="let field of formModel">

        <ng-container
          *ngIf="field.visibility[visibility]"
          dynamicControl
          [group]="form"
          [config]="field"
          [errors]="errors"
          [data]="formData"
          [disabled]="disabled"></ng-container>

        <div *ngIf="field.clearfix && field.visibility[visibility]" class="clearfix"></div>

      </ng-container>
    </div>
        `,
  styles: [`:host { display: block; } .clearfix { border-bottom: 1px dashed #d3d3d3; margin-bottom: 15px; }`],
})
export class DynamicFormFieldsComponent implements OnInit {
  @Input()
  public form: FormGroup;

  @Input()
  public formModel: ControlConfig[];

  @Input()
  public formData: any;

  @Input()
  public errors: Object = {};

  @Input()
  public visibility = 'create';

  @Input()
  public disabled = false;

  @Input()
  public debug = false;

  public constructor() { }

  public ngOnInit() { }
}
