import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TopNavComponent} from './top-nav.component';
import {MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule} from '@angular/material';
import {NavService} from '../nav.service';
import {ConfigService} from '../config.service';
import {AuthService} from '../auth.service';
import {ObservableMedia} from '@angular/flex-layout';
import {Location as NgLocation} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {MockBackend} from '@angular/http/testing';
import {HttpClient} from '@angular/common/http';

describe('TopNavComponent', () => {
  let component: TopNavComponent;
  let fixture: ComponentFixture<TopNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopNavComponent],
      imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        RouterTestingModule
      ],
      providers: [
        NavService,
        ConfigService,
        AuthService,
        ObservableMedia,
        NgLocation,
        {provide: HttpClient, deps: [MockBackend]},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
