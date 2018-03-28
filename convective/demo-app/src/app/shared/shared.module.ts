import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import 'hammerjs';
import {
  MdButtonModule, MdCheckboxModule, MdTabsModule, MdInputModule, MdSelectModule,
  MdTooltipModule, MdIconModule, MdOptionModule, MdProgressBarModule, MdProgressSpinnerModule,
  MdAutocompleteModule, MdListModule, MdCardModule, MdDatepickerModule, MdNativeDateModule
} from '@angular/material';
import {GridsFormComponent} from './grids-form/grids-form.component';
import {ItemGroupFormComponent} from './item-group-form/item-group-form.component';
import {VerifyItemFormComponent} from './verify-item-form/verify-item-form.component';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdCheckboxModule,
    MdTabsModule,
    MdInputModule,
    MdSelectModule,
    MdOptionModule,
    MdTooltipModule,
    MdIconModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdAutocompleteModule,
    MdListModule,
    MdCardModule,
    MdDatepickerModule,
    MdNativeDateModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  declarations: [
    VerifyItemFormComponent,
    ItemGroupFormComponent,
    GridsFormComponent
  ],
  exports: [
    CommonModule,
    MdButtonModule,
    MdCheckboxModule,
    MdTabsModule,
    MdInputModule,
    MdSelectModule,
    MdOptionModule,
    MdTooltipModule,
    MdIconModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdAutocompleteModule,
    MdListModule,
    MdCardModule,
    MdDatepickerModule,
    MdNativeDateModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    VerifyItemFormComponent,
    ItemGroupFormComponent,
    GridsFormComponent
  ]
})
export class SharedModule {}
