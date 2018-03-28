import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {WjFlexGrid} from 'wijmo/wijmo.angular2.grid';
import {DataService} from '../data.service';
import {Item} from '../models/Item';
import {Observable} from 'rxjs/Observable';
import {ItemSummary} from '../models/ItemSummary';
import {CollectionView} from 'wijmo/wijmo';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'hfc-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.scss']
})
export class ItemSearchComponent implements OnInit {
  @ViewChild('grid') grid: WjFlexGrid;
  filteredItems: Observable<ItemSummary[]>;
  searchForm: FormGroup;
  itemIds: ItemSummary[];
  data: Item[];
  collectionView: CollectionView;
  pricingUnits: string[];
  searchInProgress: boolean = false;
  public auto: string = 'auto';

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.createForm();
  }

  createForm() {
    this.searchForm = this.fb.group({
      orderableFilter: true,
      activeFilter: true,
      descriptionFilter: ''
    });
    this.searchForm.addControl('itemsCtrl', this.fb.control('', Validators.required));
    this.searchForm.addControl('pricingUnitFilter', this.fb.control(''));
  }

  ngOnInit(): void {
    this.data = this.dataService.getItems();
    this.collectionView = new CollectionView(this.data);
    this.collectionView.pageSize = 5;
    this.itemIds = this.dataService.getItemIdsAndDescriptions();
    this.pricingUnits = this.dataService.getPricingUnits();
    this.filteredItems = this.searchForm.get('itemsCtrl').valueChanges
        .startWith(null)
        .map((id: string) => this.filterItems(id));
    this.grid.autoSizeColumns(1, 3, false, 30);
  }

  filterItems(val: string): ItemSummary[] {
    return val ? this.itemIds.filter((s) => new RegExp(val, 'gi').test(s.id)) : this.itemIds;
  }

  resetForm() {
    this.searchForm.reset({
      orderableFilter: true,
      activeFilter: true,
      descriptionFilter: ''
    });
    this.searchForm.get('itemsCtrl').setValue('');
    this.searchForm.get('pricingUnitFilter').setValue('');
  }

  executeSearch() {
    this.searchInProgress = true;
    setTimeout(() => this.searchInProgress = false, 1500);
  }

  nextPage() {
    this.collectionView.moveToNextPage();
  }

  previousPage() {
    this.collectionView.moveToPreviousPage();
  }

  pageSizeChange(event: any) {
    this.collectionView.pageSize = +event.value;
  }
}
