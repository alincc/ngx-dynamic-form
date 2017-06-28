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

  it('should render form fields with given object', inject([FormBuilder], (fb: FormBuilder) => {
    let formModel: ControlConfig[] = [
      { name: 'email', label: 'Email', type: 'email', visibility: { create: true } }
    ];
    let reactiveForm: FormGroup = fb.group({
      email: ['']
    });

    component.formModel = formModel;
    component.form = reactiveForm;
    fixture.detectChanges();

    let html = fixture.nativeElement;

    // should render one input and one label
    expect(html.querySelector('input[name=email]')).toBeTruthy();
    expect(html.querySelector('label[for=email]')).toBeTruthy();
  }));
});