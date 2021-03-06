import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LocationCreateFormComponent} from './location-create-form.component';

describe('LocationCreateFormComponent', () => {
  let component: LocationCreateFormComponent;
  let fixture: ComponentFixture<LocationCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [LocationCreateFormComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
