import { InputControlComponent } from './input-control.component';
import { TextAreaControlComponent } from './textarea-control.component';
import { GroupBasicComponent } from './group-basic.component';
import { CheckboxArrayControlComponent } from './checkbox-array-control.component';
import { CheckboxControlComponent } from './checkbox-control.component';
import { RadioControlComponent } from './radio-control.component';
import { DatetimeControlComponent } from './datetime-control.component';
import { SelectControlComponent } from './select-control.component';
import { ControlWrapperComponent } from "app/dynamic-form/components/control-wrapper.component";

export const COMPONENTS = [
  ControlWrapperComponent,
  InputControlComponent,
  TextAreaControlComponent,
  GroupBasicComponent,
  CheckboxArrayControlComponent,
  RadioControlComponent,
  DatetimeControlComponent,
  SelectControlComponent,
  CheckboxControlComponent,
];

export const Controls = {
  'text': InputControlComponent,
  'email': InputControlComponent,
  'password': InputControlComponent,
  'number': InputControlComponent,
  'date': InputControlComponent,
  'datetime-local': DatetimeControlComponent,
  'month': InputControlComponent,
  'week': InputControlComponent,
  'time': InputControlComponent,
  'checkbox-array': CheckboxArrayControlComponent,
  'radio': RadioControlComponent,
  'checkbox': CheckboxControlComponent,
  'select': SelectControlComponent,
  'textarea': TextAreaControlComponent,
};

export const Groups = {
  'group': GroupBasicComponent,
}
