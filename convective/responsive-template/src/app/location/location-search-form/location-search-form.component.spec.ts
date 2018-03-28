import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LocationSearchFormComponent} from './location-search-form.component';

describe('LocationSearchFormComponent', () => {
  let component: LocationSearchFormComponent;
  let fixture: ComponentFixture<LocationSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [LocationSearchFormComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
