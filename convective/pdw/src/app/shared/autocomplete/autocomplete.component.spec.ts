import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HfcAutocompleteComponent} from './autocomplete.component';
import {SharedModule} from '../shared.module';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Renderer2} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('HfcAutocompleteComponent', () => {
  let component: HfcAutocompleteComponent;
  let fixture: ComponentFixture<HfcAutocompleteComponent>;

  const keyControl: FormControl = new FormControl('', Validators.required);
  const descriptionControl: FormControl = new FormControl('', Validators.required);
  const form = new FormGroup({
    keyControl: keyControl,
    descriptionControl: descriptionControl
  }, null, null);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          SharedModule,
          NoopAnimationsModule
        ],
        providers: [
          FormBuilder,
          Renderer2
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HfcAutocompleteComponent);
    component = fixture.componentInstance;
    component.parentForm = form;
    component.idControlName = 'id';
    component.descriptionControlName = 'desc';
    component.idPlaceholder = 'Id';
    component.descriptionPlaceholder = 'Description';
    component.idOptions = [];
    component.descriptionOptions = [];
    component.hideLookup = true;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
