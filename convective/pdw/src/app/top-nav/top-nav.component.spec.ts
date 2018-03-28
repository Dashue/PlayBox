import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TopNavComponent} from './top-nav.component';
import {MdButtonModule, MdIconModule, MdMenuModule, MdToolbarModule} from '@angular/material';
import {NavService} from '../nav.service';
import {ConfigService} from '../config.service';
import {AuthService} from '../auth.service';
import {BreakPointRegistry, FlexLayoutModule, MediaService} from '@angular/flex-layout';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {MockMatchMediaProvider} from '@angular/flex-layout/media-query/mock/mock-match-media';

describe('TopNavComponent', () => {
  let component: TopNavComponent;
  let fixture: ComponentFixture<TopNavComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [TopNavComponent],
        imports: [
          MdToolbarModule,
          MdButtonModule,
          MdIconModule,
          MdMenuModule,
          FlexLayoutModule,
          RouterTestingModule,
          HttpClientTestingModule
        ],
        providers: [
          NavService,
          ConfigService,
          AuthService,
          MediaService,
          MockMatchMediaProvider,
          BreakPointRegistry
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
