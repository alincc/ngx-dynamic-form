/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, inject, getTestBed, tick } from '@angular/core/testing';
import { SelectControlComponent } from './select-control.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng2-select';

describe('SelectControlComponent', () => {
  let fixture: ComponentFixture<SelectControlComponent>;
  let component: SelectControlComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectControlComponent],
      imports: [ReactiveFormsModule, SelectModule],
      providers: []
    }).compileComponents();

    fixture = getTestBed().createComponent(SelectControlComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    component.config = null;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  /*it('should return value from query selector', () => {

  });*/
});
