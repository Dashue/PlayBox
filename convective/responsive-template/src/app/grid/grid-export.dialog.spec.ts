import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridExportDialog } from './grid-export.dialog';

describe('GridExportDialog', () => {
  let component: GridExportDialog;
  let fixture: ComponentFixture<GridExportDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridExportDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridExportDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
