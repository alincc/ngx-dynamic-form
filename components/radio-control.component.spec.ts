/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, inject, getTestBed, tick } from '@angular/core/testing';
import { RadioControlComponent } from "./radio-control.component";
import { ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { ControlConfig } from "app/dynamic-form/models/control-config";

describe('RadioControlComponent', () => {
  let fixture: ComponentFixture<RadioControlComponent>;
  let component: RadioControlComponent;
  let fb: FormBuilder = new FormBuilder();
  let config: ControlConfig = {
      type: 'radio',
      id: 'myRadio',
      name: 'myRadio',
      label: 'My radio button',
      controlWrapperClass: 'form-control',
      options: [
        { id: '1', text: 'one', },
        { id: '2', text: 'two', },
      ],
    };

    let formGroup = fb.group({
      myRadio: ['']
    });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RadioControlComponent],
      imports: [ReactiveFormsModule],
      providers: []
    }).compileComponents();

    fixture = getTestBed().createComponent(RadioControlComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should return value from query selector', () => {
    component.config = config;
    component.group = formGroup;

    fixture.detectChanges();

    let html = fixture.nativeElement;

    // radio input should exists with no checked option
    expect(html.querySelectorAll('input[name=myRadio]')[0]).toBeTruthy('radio 1 should exists');
    expect(html.querySelectorAll('input[name=myRadio]')[1]).toBeTruthy('radio 2 should exists');

    // the given sorting should be the same passed on config options 
    expect(html.querySelectorAll('input[name=myRadio]')[0].value).toBe('1', 'first option value');
    expect(html.querySelector('.radio').textContent).toContain('one');

    expect(html.querySelectorAll('input[name=myRadio]')[1].value).toBe('2', 'first option value');
    expect(html.querySelector('.radio:last-child').textContent).toContain('two');
  });

  it('should have a checked radio when formGroup control has default item', () => {
    component.config = config;
    component.group = formGroup;
    component.group.patchValue({ myRadio: '1' });

    fixture.detectChanges();

    let html = fixture.nativeElement;

    expect(html.querySelector('input:checked')).toBeTruthy('radio checked exists');
    expect(html.querySelectorAll('input[name=myRadio]')[0].checked).toBe(true, 'radio 1 should be checked');
    expect(html.querySelectorAll('input[name=myRadio]')[1].checked).toBe(false, 'radio 2 SHOULDN\'T be checked');
  });
});