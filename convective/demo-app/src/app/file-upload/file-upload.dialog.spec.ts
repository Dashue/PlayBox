import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadDialog } from './file-upload.dialog';

describe('FileUploadDialog', () => {
  let component: FileUploadDialog;
  let fixture: ComponentFixture<FileUploadDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
