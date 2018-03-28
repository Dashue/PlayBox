import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import 'hammerjs';
import {
  MdButtonModule, MdCheckboxModule, MdTabsModule, MdInputModule, MdSelectModule,
  MdTooltipModule, MdIconModule, MdOptionModule, MdProgressSpinnerModule, MdAutocompleteModule, MdListModule,
  MdCardModule, MdDatepickerModule, MdNativeDateModule, MdMenuModule, MdProgressBarModule
} from '@angular/material';
import {HfcAutocompleteComponent} from './autocomplete/autocomplete.component';
import {StateService} from './state.service';

@NgModule({
  imports: [
    CommonModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdCheckboxModule,
    MdTabsModule,
    MdInputModule,
    MdSelectModule,
    MdOptionModule,
    MdTooltipModule,
    MdIconModule,
    MdProgressSpinnerModule,
    MdProgressBarModule,
    MdAutocompleteModule,
    MdListModule,
    MdCardModule,
    MdDatepickerModule,
    MdNativeDateModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  declarations: [
    HfcAutocompleteComponent
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
    MdProgressSpinnerModule,
    MdProgressBarModule,
    MdAutocompleteModule,
    MdListModule,
    MdCardModule,
    MdDatepickerModule,
    MdNativeDateModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MdMenuModule,
    HfcAutocompleteComponent
  ],
  providers: [StateService]
})
export class SharedModule {}
