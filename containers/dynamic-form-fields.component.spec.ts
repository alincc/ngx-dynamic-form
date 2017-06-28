/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormBuilder, FormGroup } from "@angular/forms";
import { SelectModule } from 'ng2-select';

import { DynamicFormFieldsComponent } from './dynamic-form-fields.component';
import { COMPONENTS } from './../components/';
import { DIRECTIVES } from './../directives/';
import { ControlConfig } from "app/dynamic-form/models/control-config";
import { FormModelParserService } from "app/dynamic-form/services/form-model-parser.service";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(),
    SelectModule,
  ],
  declarations: [...COMPONENTS, ...DIRECTIVES,],
  entryComponents: [...COMPONENTS,],
  exports: [...COMPONENTS, ...DIRECTIVES,]
})
class TestModule { }

fdescribe('DynamicFormFieldsComponent', () => {
  let component: DynamicFormFieldsComponent;
  let fixture: ComponentFixture<DynamicFormFieldsComponent>;
  let service: FormModelParserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        //...COMPONENTS,
        //...DIRECTIVES,
        DynamicFormFieldsComponent,
      ],
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        SelectModule,
        TestModule
      ],
      providers: [
        FormModelParserService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormFieldsComponent);
    component = fixture.componentInstance;
    service = TestBed.get(FormModelParserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render supported form controls', inject([FormBuilder], (fb: FormBuilder) => {
    let formModel: ControlConfig[] = [
      { name: 'name', label: 'Name', type: 'text', visibility: { create: true } },
      { name: 'email', label: 'Email', type: 'email', clearfix: true, visibility: { create: true } },
      { name: 'password', label: 'Password', type: 'password', visibility: { create: true } },
      { name: 'comments', label: 'Comments', type: 'textarea', visibility: { create: true } },
      { name: 'age', label: 'Age', type: 'number', visibility: { create: true } },
      { name: 'birth_date', label: 'Birth Date', type: 'date', visibility: { create: true } },
      { name: 'birth_date_with_time', label: 'Birth Date with time', type: 'datetime-local', visibility: { create: true } },
      { name: 'birth_date_month', label: 'Birth Date month', type: 'month', visibility: { create: true } },
      { name: 'birth_date_week', label: 'Birth Date week', type: 'week', visibility: { create: true } },
      { name: 'birth_date_time_only', label: 'Birth Date time only', type: 'time', visibility: { create: true } },
      {
        name: 'hobbies', label: 'Hobbies', type: 'checkbox-array', visibility: { create: true }, options: [
          { id: '1', text: 'music' },
          { id: '2', text: 'reading' },
        ]
      },
      {
        name: 'gender', label: 'Gender', type: 'radio', visibility: { create: true }, options: [
          { id: 'm', text: 'Male' },
          { id: 'f', text: 'Female' },
        ]
      },
      {
        name: 'country', label: 'Country', type: 'select', visibility: { create: true }, options: [
          { id: '1', text: 'Colombia' },
          { id: '2', text: 'USA' },
          { id: '3', text: 'China' },
        ]
      },
      { name: 'terms_agree', label: 'Doy you agree the terms', type: 'checkbox', visibility: { create: true } },

    ];
    let reactiveForm: FormGroup = fb.group({
      name: [],
      email: [],
      password: [],
      comments: [],
      age: [],
      birth_date: [],
      birth_date_with_time: [],
      birth_date_month: [],
      birth_date_week: [],
      birth_date_time_only: [],
      hobbies: [],
      gender: [],
      country: [],
      terms_agree: [],
    });

    component.formModel = formModel;
    component.form = reactiveForm;

    fixture.detectChanges();

    let html = fixture.nativeElement;

    // should render one input, one label and a div with clearfix class
    expect(html.querySelectorAll('.control-label').length).toBe(formModel.length, 'all labels exists');
    
    expect(html.querySelector('input[type=email]')).toBeTruthy('email input exists');
    expect(html.querySelector('input[type=text]')).toBeTruthy('text input exists');
    expect(html.querySelector('input[type=password]')).toBeTruthy('password input exists');
    expect(html.querySelector('input[type=number]')).toBeTruthy('number input exists');
    expect(html.querySelector('input[type=date]')).toBeTruthy('date input exists');
    expect(html.querySelector('input[name=birth_date_with_time]')).toBeTruthy('datetime-local/text input exists');
    expect(html.querySelector('input[type=month]')).toBeTruthy('month input exists');
    expect(html.querySelector('input[type=week]')).toBeTruthy('week input exists');
    expect(html.querySelector('input[type=time]')).toBeTruthy('time input exists');

    // checkbox-array control
    expect(html.querySelector('input[type=checkbox][name=hobbies]')).toBeTruthy('checkbox-array inputs exists');
    expect(html.querySelectorAll('input[type=checkbox][name=hobbies]').length).toBe(2, 'checkbox-array inputs count correct');

    // radio control
    expect(html.querySelector('input[type=radio][name=gender]')).toBeTruthy('radio inputs exists');
    expect(html.querySelectorAll('input[type=radio][name=gender]').length).toBe(2, 'radio inputs count correct');

    expect(html.querySelector('input[type=checkbox][name=terms_agree]')).toBeTruthy('checkbox input exists');
    expect(html.querySelector('ng-select')).toBeTruthy('select exists');
    expect(html.querySelector('textarea')).toBeTruthy('textarea exists');

    expect(html.querySelector('div.clearfix')).toBeTruthy('div.clearfix exists');
  }));
});