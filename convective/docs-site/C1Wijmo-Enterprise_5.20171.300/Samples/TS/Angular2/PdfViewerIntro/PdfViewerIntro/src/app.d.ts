/// <reference path="../typings/globals/core-js/index.d.ts" />
import * as wjcViewer from 'wijmo/wijmo.viewer';
export declare class AppCmp {
    serviceUrl: string;
    filePath: string;
    fullScreen: boolean;
    mouseMode: wjcViewer.MouseMode;
    zoomFactor: number;
    pdfViewer: wjcViewer.PdfViewer;
    private _continuousViewMode;
    constructor();
    continuousViewMode: boolean;
}
export declare class AppModule {
}
