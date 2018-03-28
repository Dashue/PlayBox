import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import 'hammerjs';
import {
  MatButtonModule, MatCheckboxModule, MatTabsModule, MatInputModule, MatSelectModule,
  MatTooltipModule, MatIconModule, MatOptionModule, MatProgressSpinnerModule, MatAutocompleteModule,
  MatListModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatMenuModule
} from '@angular/material';
import {HfcAutocompleteComponent} from './autocomplete/autocomplete.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatTooltipModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatListModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  declarations: [
    HfcAutocompleteComponent
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatTooltipModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatListModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatMenuModule,
    HfcAutocompleteComponent
  ]
})
export class SharedModule {}
