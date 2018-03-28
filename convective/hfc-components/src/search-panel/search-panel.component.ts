import {Component, ContentChild, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface SearchPanelContent {
  submit: () => void;
  clear: () => void;
}

@Component({
  selector: 'hfc-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Input() expanded: boolean = true;
  @Output() formData: EventEmitter<any> = new EventEmitter<any>();
  @Output() expandedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ContentChild('content') content: SearchPanelContent;

  constructor() {}

  ngOnInit() {}

  public clear() {
    this.content.clear();
  }

  public submit() {
    this.content.submit();
  }

  onFormData(data: any) {
    this.formData.emit(data);
  }

  private opened() {
    this.expandedChanged.emit(true);
  }

  private closed() {
    this.expandedChanged.emit(false);
  }
}
