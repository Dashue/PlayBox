import { EventEmitter, OnInit } from '@angular/core';
export interface SearchPanelContent {
    submit: () => void;
    clear: () => void;
}
export declare class SearchPanelComponent implements OnInit {
    title: string;
    description: string;
    expanded: boolean;
    formData: EventEmitter<any>;
    expandedChanged: EventEmitter<boolean>;
    content: SearchPanelContent;
    constructor();
    ngOnInit(): void;
    clear(): void;
    submit(): void;
    onFormData(data: any): void;
    private opened();
    private closed();
}
