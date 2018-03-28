import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ItemSearchFormComponent} from './item-search-form.component';
import {SharedModule} from '../../shared.module';
import {StaticLookupsService} from '../../../static-lookups.service';
import {GridInstanceService} from '../../../grid';

describe('ItemSearchFormComponent', () => {
  let component: ItemSearchFormComponent;
  let fixture: ComponentFixture<ItemSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ItemSearchFormComponent],
        imports: [SharedModule],
        providers: [StaticLookupsService, GridInstanceService]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
