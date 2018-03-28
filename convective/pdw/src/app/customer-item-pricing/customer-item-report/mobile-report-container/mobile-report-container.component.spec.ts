import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MobileReportContainerComponent} from './mobile-report-container.component';
import {MdCardModule, MdProgressSpinnerModule} from '@angular/material';
import {CustomerItemReportComponent} from '../customer-item-report.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NavService} from '../../../nav.service';
import {ConfigService} from '../../../config.service';

describe('MobileReportContainerComponent', () => {
  let component: MobileReportContainerComponent;
  let fixture: ComponentFixture<MobileReportContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MobileReportContainerComponent,
        CustomerItemReportComponent
      ],
      imports: [
        MdProgressSpinnerModule,
        MdCardModule,
        RouterTestingModule
      ],
      providers: [
        NavService,
        ConfigService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileReportContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
