import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {NavService} from './nav.service';
import {AuthService} from './auth.service';
import {MdButtonModule, MdIconModule, MdMenuModule, MdSidenavModule} from '@angular/material';
import {TopNavComponent} from './top-nav/top-nav.component';
import {MenuItemComponent} from './menu-item/menu-item.component';
import {ConfigService} from './config.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {BreakPointRegistry, FlexLayoutModule, MediaService} from '@angular/flex-layout';
import {MockMatchMediaProvider} from '@angular/flex-layout/media-query/mock/mock-match-media';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';

describe('AppComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientTestingModule,
        FlexLayoutModule,
        NoopAnimationsModule,
        MdButtonModule,
        MdIconModule,
        MdSidenavModule,
        MdMenuModule
      ],
      declarations: [
        AppComponent,
        TopNavComponent,
        MenuItemComponent
      ],
      providers: [
        AuthService,
        NavService,
        ConfigService,
        MediaService,
        MockMatchMediaProvider,
        BreakPointRegistry
      ]
    }).compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have an environmentName property`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.environmentName).toEqual(environment.environmentName);
  }));

  it('should have a sidenav', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.mat-sidenav').textContent).toBeTruthy();
    const app = fixture.debugElement.componentInstance;
    expect(app.appDrawer).toBeTruthy();
  }));
});
