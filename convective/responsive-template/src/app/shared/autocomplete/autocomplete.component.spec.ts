import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HfcAutocompleteComponent} from './autocomplete.component';

describe('HfcAutocompleteComponent', () => {
  let component: HfcAutocompleteComponent;
  let fixture: ComponentFixture<HfcAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HfcAutocompleteComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HfcAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
