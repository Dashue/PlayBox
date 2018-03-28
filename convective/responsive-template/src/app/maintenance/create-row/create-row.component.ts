import {AfterViewInit, ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {NavService} from '../../nav.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CreateRowFormComponent} from './create-row-form.component';

@Component({
  selector: 'hfc-create-row',
  templateUrl: './create-row.component.html',
  styleUrls: ['./create-row.component.scss']
})
export class CreateRowComponent implements AfterViewInit, OnInit {
  @ViewChildren(CreateRowFormComponent) viewChildren: QueryList<CreateRowFormComponent>;
  tableName: string;
  title: string;

  private childCreateRow: CreateRowFormComponent;

  constructor(
    private navService: NavService,
    private router: Router,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.navService.title = 'Create Row';
    this.tableName = this.route.snapshot.queryParamMap.get('tableName');
  }

  ngAfterViewInit() {
    this.childCreateRow = this.viewChildren.first;
    if (this.childCreateRow) {

      this.childCreateRow.onError.subscribe(error => {
        console.log(error);
      });

      const itemId = this.route.snapshot.queryParamMap.get('id');
      if (itemId) {
        this.childCreateRow.setItemId(itemId);
      }

      this.title = this.childCreateRow.title;
      this.cdRef.detectChanges();
    }
  }

  clear() {
    this.childCreateRow.clear();
  }

  save() {
    this.childCreateRow.submit().subscribe(success => {
      if (success) {
        this.router.navigate(['maintenance']);
      }
    });
  }
}
