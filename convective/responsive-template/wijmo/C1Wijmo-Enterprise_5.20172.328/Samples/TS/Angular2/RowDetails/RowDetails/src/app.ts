
///<reference path="../typings/globals/core-js/index.d.ts"/>
import * as wjcGridDetail from 'wijmo/wijmo.grid.detail';
import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';





// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, AfterViewInit, ViewChild, NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjGridDetailModule } from 'wijmo/wijmo.angular2.grid.detail';
import { DataSvc } from './services/DataSvc';

    'use strict';

    // The Explorer application root component.
    @Component({
        selector: 'app-cmp',
        templateUrl: 'src/app.html'
    })
    export class AppCmp implements AfterViewInit {

        isAnimated = true;
        private _productsCache = {};

        detailMode = wjcGridDetail.DetailVisibilityMode[wjcGridDetail.DetailVisibilityMode.ExpandSingle];
        categories = new wjcCore.CollectionView();
        products = new wjcCore.CollectionView();
        // references FlexGrid named 'flex1' in the view
        @ViewChild('flex1') flex1: wjcGrid.FlexGrid;

        constructor( @Inject(DataSvc) private _dataSvc: DataSvc, @Inject(Http) private _http: Http) {
            this.getData(this.categories, 'Categories');
            this.getData(this.products, 'Products');
        }

        ngAfterViewInit() {
            if (this.flex1) {
                this._initDetailProvider(this.flex1);
            }
        }

        private _initDetailProvider(grid: wjcGrid.FlexGrid) {
            var dp = new wjcGridDetail.FlexGridDetailProvider(grid);
            dp.maxHeight = 250;

            // create detail cells for a given row
            dp.createDetailCell = (row) => {
                var cell = document.createElement('div');
                grid.hostElement.appendChild(cell);
                var detailGrid = new wjcGrid.FlexGrid(cell, {
                    headersVisibility: wjcGrid.HeadersVisibility.Column,
                    autoGenerateColumns: false,
                    itemsSource: this.getProducts(row.dataItem.CategoryID),
                    columns: [
                        { header: 'ID', binding: 'ProductID' },
                        { header: 'Name', binding: 'ProductName' },
                        { header: 'Qty/Unit', binding: 'QuantityPerUnit' },
                        { header: 'Unit Price', binding: 'UnitPrice' },
                        { header: 'Discontinued', binding: 'Discontinued' }
                    ]
                });
                cell.parentElement.removeChild(cell);
                return cell;
            };

            // remove details from items with odd CategoryID
            dp.rowHasDetail = function (row) {
                return row.dataItem.CategoryID % 2 == 0;
            };
        }


        // function to fill a CollectionView with data from an OData source
        getData(view: wjcCore.CollectionView, url: string) {

            // build request url
            var serviceBase = 'http://services.odata.org/Northwind/Northwind.svc/';
            url = serviceBase + url;
            url += (url.indexOf('?') < 0) ? '?' : '&' + '$format=json';

            // TBD: achieve this via Ng2 http
            // submit request
            //this._http.get(url).subscribe((res: Response) => {
            //this._http.get(url).map((res: Response) => res.json()).subscribe(something => {
            //this._http.get(url).subscribe(something => {
            $.getJSON(url, null, (data) => {

                // handle this batch
                var items = data.value;
                for (var i = 0; i < items.length; i++) {
                    view.sourceCollection.push(items[i]);
                }

                // and go fetch more...
                var next = <string>data['odata.nextLink'];
                if (next) {
                    this.getData(view, next);
                }

            });
        }

        getProducts(categoryID: any) {
            var view = this._productsCache[categoryID];
            if (!view) {
                view = new wjcCore.CollectionView(this.products.sourceCollection);
                view.filter = function (item) {
                    return item.CategoryID == categoryID;
                }
                this._productsCache[categoryID] = view;
            }
            return view;
        }


    }

    @NgModule({
        imports: [WjInputModule, WjGridModule, WjGridDetailModule, BrowserModule, HttpModule],
        declarations: [AppCmp],
        providers: [DataSvc],
        bootstrap: [AppCmp]
    })
    export class AppModule {
    }


    enableProdMode();
    // Bootstrap application with hash style navigation and global services.
    platformBrowserDynamic().bootstrapModule(AppModule);
