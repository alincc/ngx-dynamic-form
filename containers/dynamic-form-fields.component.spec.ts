/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from "@angular/forms";
import { SelectModule } from 'ng2-select';

import { DynamicFormFieldsComponent } from './dynamic-form-fields.component';
import { COMPONENTS } from './../components/';
import { DIRECTIVES } from './../directives/';

fdescribe('DynamicFormFieldsComponent', () => {
  let component: DynamicFormFieldsComponent;
  let fixture: ComponentFixture<DynamicFormFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ...COMPONENTS,
        ...DIRECTIVES,
        DynamicFormFieldsComponent,
      ],
      imports: [
        ReactiveFormsModule,
        SelectModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormFieldsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});