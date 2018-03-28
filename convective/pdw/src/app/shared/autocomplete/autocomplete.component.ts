import {
  Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LookupFieldResult} from '../../models';
import {MdAutocomplete} from '@angular/material';

@Component({
  selector: 'hfc-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HfcAutocompleteComponent implements OnInit, DoCheck, OnChanges {
  @Output() searchClick: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('idAutocomplete') idAutocomplete: MdAutocomplete;
  @ViewChild('descriptionAutocomplete') descriptionAutocomplete: MdAutocomplete;
  @Input() parentForm: FormGroup;
  @Input() idControlName: string;
  @Input() descriptionControlName: string;
  @Input() idPlaceholder: string;
  @Input() descriptionPlaceholder: string;
  @Input() idOptions: LookupFieldResult[];
  @Input() descriptionOptions: LookupFieldResult[];
  @Input() hideLookup: boolean;
  public idLookupInProgress: boolean = false;
  public descriptionLookupInProgress: boolean = false;

  constructor(private fb: FormBuilder,
              private renderer: Renderer2) {
  }

  ngOnInit() {
    this.parentForm.addControl(this.idControlName, this.fb.control({}));
    this.parentForm.addControl(this.descriptionControlName, this.fb.control({}));

    // No progress bars when autocomplete results are disabled
    if (!this.hideLookup) {
      this.parentForm.get(this.idControlName)
        .valueChanges
        .debounceTime(500)
        .distinctUntilChanged()
        .subscribe((value: string | LookupFieldResult) => {
          if (typeof value === 'string' && value) {
            this.idLookupInProgress = true;
          }
        });

      this.parentForm.get(this.descriptionControlName)
        .valueChanges
        .debounceTime(500)
        .distinctUntilChanged()
        .subscribe((value: string | LookupFieldResult) => {
          if (typeof value === 'string' && value) {
            this.descriptionLookupInProgress = true;
          }
        });
    }
  }

  ngDoCheck() {
    // Apply styles to options panels to make them wider
    if (this.idAutocomplete.panel) {
      this.renderer.addClass(this.idAutocomplete.panel.nativeElement, 'idAutocomplete');
    }
    if (this.descriptionAutocomplete.panel) {
      this.renderer.addClass(this.descriptionAutocomplete.panel.nativeElement, 'descriptionAutocomplete');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // No progress bars when autocomplete results are disabled
    if (!this.hideLookup) {
      if (changes['idOptions']) {
        this.idLookupInProgress = false;
      }
      if (changes['descriptionOptions']) {
        this.descriptionLookupInProgress = false;
      }
    }
  }

  // noinspection JSMethodCanBeStatic
  idDisplayFn(option: LookupFieldResult | string): string {
    if (option && typeof option === 'object') {
      return option.fieldKey;
    } else if (option && typeof option === 'string') {
      return option;
    } else {
      return '';
    }
  }

  // noinspection JSMethodCanBeStatic
  descriptionDisplayFn(option: LookupFieldResult | string): string {
    if (option && typeof option === 'object') {
      return option.fieldDescription;
    } else if (option && typeof option === 'string') {
      return option;
    } else {
      return '';
    }
  }
}
