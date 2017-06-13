# Dynamic Form Angular 2+ Module

This is a dynamic form builder module for Angular 2+ apps, optimized to be used with [Hello-Angular](https://github.com/llstarscreamll/Hello-Angular). This module will help you to speed up your forms build process based on a given config object.

## Install

From the Hello-Angular or your project root folder:

```bash
npm i --save jquery # fot the datepicker directive only
npm i --save eonasdan-bootstrap-datetimepicker # fot the datepicker directive only
npm i --save moment # fot the datepicker directive only
npm i --save ng2-select
git clone https://github.com/llstarscreamll/ngx-dynamic-form.git src/app/dynamic-form
```

This module should be used as a shared module, so you need to import it on any other module since all directives and components are exported.

## Usage

You should use the main component like this:

```html
<!-- user-form.component.html -->
<dynamic-form-fields
  [form]="form"
  [formModel]="formModel$ | async"
  [formData]="formData$ | async"
  [errors]="(messages$ | async)?.errors || {}"
  [visibility]="formType"
  [disabled]="formType == 'details'">
</dynamic-form-fields>
```

Where the component inputs means:

- `[form]`, FormGroup instance with all the fileds defined.
- `[formModel]`, object that has all the fields config, check the `ControlConfig` class on the `models/control-config-ts` file to see what can be added.
- `[formData]`, form data to be used on the form fields, like a users list or wahtever.
- `[errors]`, form errors object, mainly used to display API errors on the form.
- `[visibility]`, which fields to show based on their `visibility` config param.
- `[disabled]`, force the form fileds to be disabled.

And the component passed inputs:

```typescript
@Component({ selector: 'user-form-component', templateUrl: './user-form.component.html' })
export class UserFormComponent {
  /**
   * The reactive form.
   */
  public form: FormGroup;

  /**
   * Form model fields config.
   */
  public formModel$: any = {
    "id": {
      "name": "id",
      "type": "text",
      "placeholder": "",
      "value": null,
      "min": "",
      "max": "",
      "mainWrapperClass": "col-sm-6",
      "labelClass": "",
      "controlWrapperClass": "",
      "controlClass": "",
      "break": true,
      // here you specify which fileds to show on certain scenarios like create, update, details, search, etc
      "visibility": { "create": false, "details": true, "edit": false, "search": true },
      // here you define the validation rules, the Laravel way, maybe in the future all the Laravel rules could be supported
      "validation": ["numeric"]
    },
    "name": {
      "name": "name",
      "type": "text",
      "placeholder": "",
      "value": null,
      "mainWrapperClass": "col-sm-6",
      "visibility": { "create": true, "create-by-name": true, "details": true, "edit": true, "search": true },
      "validation": ["required", "string"]
    },
    "username": {
      "name": "username",
      "type": "text",
      "placeholder": "",
      "value": null,
      "mainWrapperClass": "col-sm-6",
      "visibility": { "create": true, "details": true, "edit": true, "search": true },
      "validation": ["required", "string"]
    },
    "password": {
      "name": "password",
      "type": "password", // for passwords fields
      "placeholder": "",
      "value": null,
      "mainWrapperClass": "col-sm-6",
      "visibility": { "create": true, "details": true, "edit": true, "search": true },
      "validation": ["required", "string"]
    },
    "skills": {
      "name": "skills",
      "type": "select", // for select dropdowns
      "placeholder": "---",
      "value": null,
      "mainWrapperClass": "col-sm-6",
      "options": ["mysql", "oracle", "SQLServer", "mongoDB",], // select with static options
      "visibility": { "create": true, "details": true, "edit": true, "search": true },
      "validation": ["required", "string"]
    },
    "age": {
      "name": "port",
      "type": "number", // for number fields
      "placeholder": "",
      "value": null,
      "min": "1", // min value
      "max": "",
      "mainWrapperClass": "col-sm-6",
      "visibility": { "create": true, "details": true, "edit": true, "search": true },
      "validation": ["required", "numeric"]
    },
    "roles": {
      "name": "roles",
      "type": "select", // select dropdown
      "multiple": true,
      "placeholder": "",
      "value": "",
      "mainWrapperClass": "col-sm-6",
      "break": true,
      "visibility": { "create": true, "create-by-name": true, "details": true, "edit": true, "search": true },
      // select with dynamic options, based on the given "formData" object, so in "formData" must be a key named "Roles"
      // with the array values to be used for this select
      "dynamicOptions": { "data": "Roles" },
      "validation": ["required", "exists:roles,id"]
    },
    "created_at": {
      "name": "created_at",
      "type": "datetime-local",
      "placeholder": "",
      "value": null,
      "mainWrapperClass": "col-sm-6",
      "visibility": { "details": true, "search": true }, // only show this field on details and search forms
      "validation": ["date:Y-m-d H:m:s"] // rule not supported
    },
    "updated_at": {
      "name": "updated_at",
      "type": "datetime-local",
      "placeholder": "",
      "value": null,
      "mainWrapperClass": "col-sm-6",
      "visibility": { "details": true, "search": true }, // only show this field on details and search forms
      "validation": ["date:Y-m-d H:m:s"] // rule not supported
    }
  };

  /**
   * Form data to be used by the form fields.
   */
  public formData: any = {
    Roles: [ // data to be used by the "roles" field, in real app you should get this data from an API
      {id: 1, text: 'admin'},
      {id: 2, text: 'author'},
    ],
  };

  /**
   * API messages. Press ctrl + click on the interface to see what attrs are available.
   */
  public messages: AppMessage;

  /**
   * This will tell the dynamic-form-fields component to show only the fields who has "visibility: { create: true }"
   */
  public visivility: string = 'create';

  /**
   * Don't make the form fields disabled.
   */
  public disabled: boolean = false;

  /**
   * Create a new UserFormComponent instance.
   */
  public construct(
    // this service parses the form model to a FormGroup object
    // and do some other transformations if needed, check out
    // the service to see what happens
    private formModelParserSrvc: FormModelParserService,
  ) {
    this.formModel = this.formModelParserSrvc.parse(this.formModel);
    this.form = this.formModelParserService.toFormGroup(this.formModel);
  }
}
```

As you can see, the `formModel` and `formData` are objects that you maybe could retrieve from your API or has in a separated file on you Angular module. The `messages` object represents the validation or other messages state from API. The `FormModelParserService` makes transformations on the given form model object and parses it to a FormGroup instance, taking care of the given validation rules, currently the default Angular validations are available.

## Tests

This modules has a few tests (more tests are on progress):

```bash
ng test
```
