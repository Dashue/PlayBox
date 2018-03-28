

import * as wjcCore from 'wijmo/wijmo';



/*
    *
    * Wijmo Library 5.20171.300
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the Wijmo Commercial License.
    * sales@wijmo.com
    * wijmo.com/products/wijmo-5/license/
    *
    */
///<amd-module name='wijmo/wijmo.angular2.directiveBase'/>

import * as ng2 from '@angular/core';
import {ChangeDetectionStrategy, Type, ViewEncapsulation, ReflectiveInjector, Injectable, Inject, Injector,
    EventEmitter, NgZone, NgModule } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

'use strict';

export interface IWjMetaBase {
    selector: string;
    inputs: string[];
    outputs: string[];
    providers: any[];
}

export interface IWjComponentMeta extends IWjMetaBase {
    template: string;
}

export interface IWjDirectiveMeta extends IWjMetaBase {
    exportAs: string;
}

// Maps event names to corresponding two-way property names whose change the event notifies.
export type ChangePropertyEvent = { prop: string, evExposed: string, evImpl: string };
export type EventPropertiesItem =
    {
        event: string,
        eventImpl: string,
        props?: ChangePropertyEvent[]
    };
export type EventProperties = EventPropertiesItem[];

export interface IWjComponentMetadata {
    changeEvents?: { [event: string]: string[] };
    outputs?: string[];
    siblingId?: string;
    parentRefProperty?: string;
}

export class WjComponentResolvedMetadata {
    readonly changeEventMap: EventPropertiesItem[] = [];

    constructor(rawMeta: IWjComponentMetadata) {
        this.resolveChangeEventMap(rawMeta);
    }

    private resolveChangeEventMap(rawMeta: IWjComponentMetadata) {
        let map = this.changeEventMap,
            outputs = rawMeta.outputs,
            changeEvents = rawMeta.changeEvents || {};
        map.splice(0, map.length);
        if (!(outputs && outputs.length)) {
            return;
        }
        // Creates array of { implName, exposeName } objects, with both properties defined.
        let outputPairs = outputs.map((strPair) => strPair.split(':'))
            .filter((arrPair) => arrPair.length === 2 && arrPair[0] && arrPair[1])
            .map((arrPair) => { return { implName: arrPair[0].trim(), exposeName: arrPair[1].trim() } });
        for (let pair of outputPairs) {
            let wjEvent = Ng2Utils.getWjEventName(pair.implName);
            if (wjEvent) {
                let eventItem: EventPropertiesItem = {
                    eventImpl: pair.implName, event: pair.exposeName
                };
                let changeProps = changeEvents[pair.exposeName];
                if (changeProps && changeProps.length) {
                    eventItem.props = changeProps.map((prop) => {
                        let ret = {
                            prop: prop,
                            evExposed: Ng2Utils.getChangeEventNameExposed(prop),
                            evImpl: Ng2Utils.getChangeEventNameImplemented(prop)
                        }
                        return ret;
                    });
                }
                map.push(eventItem);
            }
        }

        // add parent path ("dot") prop change events
        for (let propChangeEvent in changeEvents) {
            if (propChangeEvent.indexOf('.') > -1) {
                let eventItem: EventPropertiesItem = {
                    eventImpl: null,
                    event: propChangeEvent,
                    props: changeEvents[propChangeEvent].map((prop) => {
                        let ret: ChangePropertyEvent = {
                            prop: prop,
                            evExposed: Ng2Utils.getChangeEventNameExposed(prop),
                            evImpl: Ng2Utils.getChangeEventNameImplemented(prop)
                        };
                        return ret;
                    })
                };
                map.push(eventItem);
            }
        }

    }
}


export class WjDirectiveBehavior {
    // Name of the property created on directive and Injector instances that references this behavior
    static directiveTypeDataProp = 'meta';
    static directiveResolvedTypeDataProp = '_wjResolvedMeta';
    static BehaviourRefProp = '_wjBehaviour';
    static parPropAttr = 'wjProperty';
    static wjModelPropAttr = 'wjModelProperty';
    static initializedEventAttr = 'initialized';
    static isInitializedPropAttr = 'isInitialized';
    static siblingDirIdAttr = 'wj-directive-id';
    static siblingDirId = 0;
    static wijmoComponentProviderId = 'WjComponent';

    private static _pathBinding = new wjcCore.Binding('');
    private _siblingInsertedEH;

    directive: Object;
    typeData: IWjComponentMetadata;
    resolvedTypeData: WjComponentResolvedMetadata;
    elementRef: ng2.ElementRef;
    injector: ng2.Injector;
    injectedParent: any;
    parentBehavior: WjDirectiveBehavior;
    isInitialized = false;
    isDestroyed = false;

    static getHostElement(ngHostElRef: ng2.ElementRef): HTMLElement {
        return <HTMLElement>ngHostElRef.nativeElement;
    }

    static attach(directive: Object, elementRef: ng2.ElementRef, injector: ng2.Injector,
            injectedParent: any): WjDirectiveBehavior {
        //console.log('ctor: ' + directive.constructor['name']);
        return new WjDirectiveBehavior(directive, elementRef, injector, injectedParent);
    }

    constructor(directive: Object, elementRef: ng2.ElementRef, injector: ng2.Injector,
            injectedParent: any) {
        this.directive = directive;
        this.elementRef = elementRef;
        this.injector = injector;
        this.injectedParent = injectedParent;
        let typeData: IWjComponentMetadata = this.typeData =
            directive.constructor[WjDirectiveBehavior.directiveTypeDataProp];
        if (typeData.siblingId == null) {
            typeData.siblingId = (++WjDirectiveBehavior.siblingDirId) + '';
        }
        let resolvedTypeData = directive.constructor[WjDirectiveBehavior.directiveResolvedTypeDataProp];
        if (resolvedTypeData) {
            this.resolvedTypeData = resolvedTypeData;
        } else {
            directive.constructor[WjDirectiveBehavior.directiveResolvedTypeDataProp] =
                resolvedTypeData = this.resolvedTypeData = new WjComponentResolvedMetadata(typeData);
        }
        directive[WjDirectiveBehavior.BehaviourRefProp] = this;
        injector[WjDirectiveBehavior.BehaviourRefProp] = this;
        directive[WjDirectiveBehavior.isInitializedPropAttr] = false;

        this._setupAsChild();
        if (this._isHostElement()) {
            (<HTMLElement>elementRef.nativeElement).setAttribute(WjDirectiveBehavior.siblingDirIdAttr,
                typeData.siblingId);
        }
        // We can subscribe only to 'own' (without '.' in event name) events here. Handlers to foreign
        // events will be added in ngOnInit.
        this.subscribeToEvents(false);
    }

    ngOnInit() {
        this.isInitialized = true;
        this._initParent();
        // subscribe to foreign events here (like Column's 'grid.selectionChanged').
        this.subscribeToEvents(true);
    }

    ngAfterViewInit() {
        this.directive[WjDirectiveBehavior.isInitializedPropAttr] = true;
        (<ng2.EventEmitter<any>>this.directive[WjDirectiveBehavior.initializedEventAttr]).emit(undefined);
        //console.log('dirAfterViewInit: ' + this.directive.constructor['name']);
    }

    ngOnDestroy() {
        if (this.isDestroyed) {
            return;
        }
        this.isDestroyed = true;
        var control = this.directive;
        if (this._siblingInsertedEH) {
            this.elementRef.nativeElement.removeEventListener('DOMNodeInserted', this._siblingInsertedEH);
        }
        if (this._isChild() && this.parentBehavior) {
            let parControl = this.parentBehavior.directive,
                parProp = this._getParentProp();
            if (!this.parentBehavior.isDestroyed && parControl && parProp && control) {
                let parArr: any[] = parControl[parProp];
                if (wjcCore.isArray(parArr)) {
                    if (parArr) {
                        var idx = parArr.indexOf(control);
                        if (idx >= 0) {
                            parArr.splice(idx, 1);
                        }
                    }
                }
            }
        }

        if (control instanceof wjcCore.Control) {
            // We call dispose() with a delay, to get directives such as ng-if/ng-repeat a chance to remove its child subtree
            // berore the control will be disposed. Otherwise, Control.dispose() replaces its host element with an assignment 
            // to outerHTML, that creates an element clone in its parent with a different pointer, not the one that
            // ng-if stores locally, so this clone is out of ng-if control and stays in DOM forever.
            // TBD: do we need this delay in Ng2?
            // Answer: no, it breaks controls in templates, because Ng2 reuses control's host elements.
            //setTimeout(function () {
            if (control.hostElement) {
                // control.dispose() kills current host element (by outerHTML=... assignment), while Ng2 reuses it,
                // so we need to keep it in its correct position after call to control.dispose().
                let host = <HTMLElement>this.elementRef.nativeElement,
                    hostParent = host && host.parentNode,
                    hostIdx = hostParent ? Array.prototype.indexOf.call(hostParent.childNodes, host) : -1;
                //TBD: !!! control.dispose() will dispose all child controls, we need to dispose all directives before it!!!
                control.dispose();
                if (hostIdx > -1 && Array.prototype.indexOf.call(hostParent.childNodes, host) < 0) {
                    host.textContent = '';
                    if (hostIdx < hostParent.childNodes.length) {
                        hostParent.replaceChild(host, hostParent.childNodes[hostIdx]);
                    }
                    //else {
                    //    hostParent.appendChild(host);
                    //}
                }
            }

            //}, 0);
        }
        this.injector[WjDirectiveBehavior.BehaviourRefProp] = null;
    }

    public static instantiateTemplate(parent: HTMLElement, viewContainerRef: ng2.ViewContainerRef,
        templateRef: ng2.TemplateRef<any>, domRenderer: ng2.Renderer, useTemplateRoot: boolean = false):
        { viewRef: ng2.EmbeddedViewRef<any>, rootElement: Element } {
        var viewRef = viewContainerRef.createEmbeddedView(templateRef, {}, viewContainerRef.length);

        var nodes = viewRef.rootNodes,
            rootEl: HTMLElement;
        if (useTemplateRoot && nodes.length === 1) {
            rootEl = nodes[0];
        } else {
            rootEl = document.createElement('div');
            for (let curNode of nodes) {
                rootEl.appendChild(curNode);
            }
        }
        if (parent) {
            parent.appendChild(rootEl);
        }

        return { viewRef: viewRef, rootElement: rootEl };
    }

    public getPropChangeEvent(propName: string): string {
        let evToProps = this.typeData.changeEvents;
        if (evToProps) {
            for (let event in evToProps) {
                if (evToProps[event].indexOf(propName) > -1) {
                    return event;
                }
            }
        }

        return null;
    }


    // afterInit - indicates the phase (constructor (false) or ngOnInit (true))
    private subscribeToEvents(afterInit: boolean) {
        var changeEvents = this.resolvedTypeData.changeEventMap;
        afterInit = !!afterInit;
        // Add handlers
        for (let curEventMap of changeEvents) {
            if (afterInit !== (curEventMap.event.indexOf(".") < 0)) {
                this.addHandlers(curEventMap);
            }
        }

        if (afterInit) {
            // update two-way bindings in the target-to-source direction
            for (let curEventMap of changeEvents) {
                this.triggerPropChangeEvents(curEventMap);
            }
        }
    }

    private addHandlers(eventMap: EventPropertiesItem) {
        let directive = this.directive;

        (<wjcCore.Event>WjDirectiveBehavior.evaluatePath(directive, eventMap.event)).addHandler((s, e) => {
            // Trigger property change events
            if (this.isInitialized) {
                this.triggerPropChangeEvents(eventMap);
            }

                // Trigger Wijmo event
            if (eventMap.eventImpl) {
                (<ng2.EventEmitter<any>>directive[eventMap.eventImpl]).next(e);
            }
        });
    }

    private triggerPropChangeEvents(eventMap: EventPropertiesItem) {
        let directive = this.directive;
        if (eventMap.props && eventMap.props.length) {
            // Trigger property change events
            for (let curChangeProp of eventMap.props) {
                (<ng2.EventEmitter<any>>directive[curChangeProp.evImpl]).next(directive[curChangeProp.prop]);
            }
        }
    }

    private _setupAsChild() {
        if (!this._isChild()) {
            return;
        }

        if (this._isHostElement()) {
            (<HTMLElement>this.elementRef.nativeElement).style.display = 'none';
        }

        this.parentBehavior = WjDirectiveBehavior.getBehavior(this.injectedParent);
    }

    // --------------------- Child directive ------------------------

    //Determines whether this is a child link.
    //NOTE: functionality is *not* based on _parentPropDesc
    private _isChild(): boolean {
        return this._isParentInitializer() || this._isParentReferencer();
    }
    // Indicates whether this directictive operates as a child directictive that initializes a property of its parent.
    private _isParentInitializer(): boolean {
        return this.directive[WjDirectiveBehavior.parPropAttr] != null;
    }

    // Indicates whether this directictive operates as a child directictive that references a parent in its property or
    // a constructor.
    private _isParentReferencer(): boolean {
        // only non-empty string resolves to true
        return !!this.typeData.parentRefProperty;
    }

    //For the child directives returns parent's property name that it services. Property name defined via
    //the wjProperty attribute of directive tag has priority over the directive._property definition.
    //NOTE: functionality is *not* based on _parentPropDesc
    private _getParentProp(): string {
        return this.directive[WjDirectiveBehavior.parPropAttr];
    }

    // For a child directive, the name of the property of the directive's underlying object that receives the reference
    // to the parent, or an empty string that indicates that the reference to the parent should be passed as the 
    // underlying object's constructor parameter.
    private _getParentReferenceProperty(): string {
        //return this.typeData.metaData.parentReferenceProperty;
        return this.typeData.parentRefProperty;
    }

    // Determines whether the child link uses an object created by the parent property, instead of creating it by
    // itself, and thus object's initialization should be delayed until parent link's control is created.
    //IMPORTANT: functionality is *based* on _parentPropDesc
    private _useParentObj(): boolean {
        // we can't support this, all affected properties should be read-write
        return false;
    }

    // For the child referencer directive, indicates whether the parent should be passed as a parameter the object
    // constructor.
    private _parentInCtor(): boolean {
        return this._isParentReferencer() && this._getParentReferenceProperty() == '';
    }

    private _initParent() {
        if (!this.parentBehavior || this._useParentObj()) {
            return;
        }

        var parDir = this.parentBehavior.directive,
            propName = this._getParentProp(),
            control = this.directive;
        if (this._isParentInitializer()) {
            let parProp = this._getParentProp();

            let parArr = <any[]>parDir[propName];
            if (wjcCore.isArray(parArr)) {
                // insert child at correct index, which is the same as an index of the directive element amid sibling directives
                // of the same type
                let isHostElement = this._isHostElement(),
                    linkIdx = isHostElement ? this._getSiblingIndex() : -1;
                if (linkIdx < 0 || linkIdx >= parArr.length) {
                    linkIdx = parArr.length;
                }
                parArr.splice(linkIdx, 0, control);
                if (isHostElement) {
                    this._siblingInsertedEH = this._siblingInserted.bind(this);
                    this.elementRef.nativeElement.addEventListener('DOMNodeInserted', this._siblingInsertedEH);
                }
            } else {
                parDir[propName] = control;
            }
        }
        if (this._isParentReferencer() && !this._parentInCtor()) {
            control[this._getParentReferenceProperty()] = parDir;
        }
    }

    // Gets an index of this directive host element among another host elements pertain to the same directive type.
    _getSiblingIndex() {
        var thisEl = this.elementRef.nativeElement,
            parEl = thisEl.parentElement;
        // If parentElement is null, e.g. because this element is temporary in DocumentFragment, the index
        // of the element isn't relevant to the item's position in the array, so we return -1 and thus force
        // a calling code to not reposition the item in the array at all.  
        if (!parEl) {
            return -1;
        }
        var siblings = parEl.childNodes,
            idx = -1,
            dirId = this.typeData.siblingId;
        for (var i = 0; i < siblings.length; i++) {
            var curEl = <HTMLElement>siblings[i];
            if (curEl.nodeType == 1 && curEl.getAttribute(WjDirectiveBehavior.siblingDirIdAttr) == dirId) {
                ++idx;
                if (curEl === thisEl) {
                    return idx;
                }
            }
        }

        return -1;
    }

    private _siblingInserted(e) {
        if (e.target === this.elementRef.nativeElement) {
            var lIdx = this._getSiblingIndex(),
                parArr = <any[]>this.parentBehavior.directive[this._getParentProp()],
                directive = this.directive,
                arrIdx = parArr.indexOf(directive);
            if (lIdx >= 0 && arrIdx >= 0 && lIdx !== arrIdx) {
                parArr.splice(arrIdx, 1);
                lIdx = Math.min(lIdx, parArr.length);
                parArr.splice(lIdx, 0, directive);
            }
        }
    }

    // Indicates whether the host node is HTMLElement. E.g. for template directive a host node is comment.
    private _isHostElement() {
        return (<Node>this.elementRef.nativeElement).nodeType === Node.ELEMENT_NODE 
    }

    // --- end of Child directive ------------------------


    // ----- Utility methods

    private static evaluatePath(obj: any, path: string): any {
        this._pathBinding.path = path;
        return this._pathBinding.getValue(obj);
    }

    // Gets WjDirectiveBehavior associated with specified directive.
    static getBehavior(directive: any): WjDirectiveBehavior {
        return directive ? directive[WjDirectiveBehavior.BehaviourRefProp] : null;
    }

}

export class Ng2Utils {
    static changeEventImplementSuffix = 'PC';
    static wjEventImplementSuffix = 'Ng';

    // Returns an array for the @Component 'outputs' property.
    public static initEvents(directiveType: any, changeEvents: EventPropertiesItem[]): string[] {
        var ret: string[] = [];
        for (let curEventMap of changeEvents) {
            let changeProps = curEventMap.props;
            if (curEventMap.event && curEventMap.eventImpl) {
                ret.push(curEventMap.eventImpl + ':' + curEventMap.event);
            }
            if (changeProps && changeProps.length) {
                for (let curChangeProp of changeProps) {
                    ret.push(curChangeProp.evImpl + ':' + curChangeProp.evExposed);
                }
            }
        }

        return ret;
    }

    static getChangeEventNameImplemented(propertyName) {
        //return Ng2Utils.getChangeEventNameExposed(propertyName) + 'Ng';
        return Ng2Utils.getChangeEventNameExposed(propertyName) + Ng2Utils.changeEventImplementSuffix; //'PC';
    }
    static getChangeEventNameExposed(propertyName) {
        return propertyName + 'Change';
    }
    private static getWjEventNameImplemented(eventName) {
        //return eventName + 'Wj';
        return eventName + Ng2Utils.wjEventImplementSuffix; //'Ng';
    }

    static getWjEventName(ngEventName: string) {
        if (ngEventName) {
            const ngSuffix = Ng2Utils.wjEventImplementSuffix;
            let suffixIdx = ngEventName.length - ngSuffix.length;
            if (suffixIdx > 0 && ngEventName.substr(suffixIdx) === ngSuffix) {
                return ngEventName.substr(0, suffixIdx);
            }
        }

        return null;
    }

    // Gets the base type for the specified type.
    static getBaseType(type: any): any {
        let proto;
        return type && (proto = Object.getPrototypeOf(type.prototype)) && proto.constructor;
    }

    static getAnnotations(type: any): any[] {
        //return type && reflector.annotations(type);
        return (<any>Reflect).getMetadata('annotations', type);
    }

    static getAnnotation(annotations: any[], annotationType: any): any {
        if (annotationType && annotations) {
            for (let curAnno of annotations) {
                if (curAnno instanceof annotationType) {
                    return curAnno;
                }
            }
        }

        return null;
    }

    // Gets the annotation of the specified annotationType defined on the specified 'type'. 
    // If 'own' is true then method will traverse up the type inheritance hierarchy to find the requested
    // annotation type.
    static getTypeAnnotation(type: any, annotationType: any, own?: boolean) {
        for (let curType = type; curType; curType = own ? null : Ng2Utils.getBaseType(curType)) {
            let anno = Ng2Utils.getAnnotation(Ng2Utils.getAnnotations(curType),
                annotationType);
            if (anno) {
                return anno;
            }
        }

        return null;
    }

    // override - if true then array property values will be replaced; otherwise, concatenated.
    // includePrivate - if true then properties whose names start with '_' will be copied.
    // filter - function(name, value): boolean
    static _copy(dst: any, src: any, override?: boolean, includePrivate?: boolean,
        filter?: (name: string, value: any) => boolean) {
        if (dst && src) {
            for (let prop in src) {
                if (includePrivate || prop[0] !== '_') {
                    let val = src[prop];
                    if (!filter || filter(prop, val)) {
                        let dstVal = dst[prop];
                        if (wjcCore.isArray(val)) {
                            dst[prop] = (!wjcCore.isArray(dstVal) || override ? [] : <any[]>dstVal)
                                .concat(<any[]>val);
                        } else if (val !== undefined) {
                            dst[prop] = val;
                        }
                    }
                }
            }
        }
    }

}


@Injectable()
export class WjValueAccessor implements ControlValueAccessor {
    private _isFirstChange = true;
    //private _injector: Injector;
    private _directive: any;
    private _behavior: WjDirectiveBehavior;
    private _ngModelProp: string;
    private _modelValue: any;
    private _isSubscribed = false;
    private _dirInitEh: any;
    private _onChange = (_: any) => { };
    private _onTouched = () => { };

    constructor( /*@Inject(Injector) injector: Injector*/ directive: any ) {
        //this._injector = injector;
        this._directive = directive;
        this._behavior = WjDirectiveBehavior.getBehavior(directive);
    }

    writeValue(value: any): void {
        //this._ensureDirective();
        this._modelValue = value;
        // the directive can be not initialized yet during this call, so we wait for its initialization
        // and assign the value only after it
        if (this._directive.isInitialized) {
            this._ensureInitEhUnsubscribed();
            this._updateDirective();
            this._isFirstChange = false; //see _updateDirective()
        } else {
            if (this._dirInitEh) { // means that writeValue is called for the second or subsequent time
                this._isFirstChange = false; //see _updateDirective()
            } else {
                let initEvent = <EventEmitter<any>>this._directive.initialized;
                this._dirInitEh = initEvent.subscribe(() => {
                    this._updateDirective();
                    this._ensureInitEhUnsubscribed();
                });
            }
        }
    }

    registerOnChange(fn: (_: any) => void): void { this._onChange = fn; }
    registerOnTouched(fn: () => void): void { this._onTouched = fn; }

    private _updateDirective() {
        // patch: seems a bug introduced in RC.4 - ngModel always writes a null during initialization,
        // though the source value is not a null, so we avoid value propagation during the first call
        // using _notFirstChange.
        // Note that this is not the issue when accessors is initialized by the FormControlName->FormGroupDirective
        // (in scenarios like in Ng2 DynamicForms sample).
        if (!this._isFirstChange || this._modelValue != null) {
            this._ensureNgModelProp();
            if (this._directive && this._ngModelProp) {
                let normValue = this._modelValue;
                // Ng2 converts nulls/indefined to '', we have to convert them back.
                if (normValue === '') {
                    normValue = null;
                }
                this._directive[this._ngModelProp] = normValue;
            }
            this._ensureSubscribed();
        }
    }

    private _ensureSubscribed() {
        if (this._isSubscribed) {
            return;
        }
        let directive = this._directive;
        if (directive) {
            this._ensureNgModelProp();
            let ngModelProp = this._ngModelProp = directive[WjDirectiveBehavior.wjModelPropAttr];
            if (ngModelProp) {
                let changeEvent = this._behavior.getPropChangeEvent(ngModelProp);
                if (changeEvent) {
                    directive[changeEvent].addHandler(this._dirValChgEh, this);
                }
            }
            if (directive instanceof wjcCore.Control) {
                directive.lostFocus.addHandler(this._dirLostFocusEh, this);
            }
            this._isSubscribed = true;
        }
    }

    private _ensureNgModelProp() {
        if (!this._ngModelProp && this._directive) {
            this._ngModelProp = this._directive[WjDirectiveBehavior.wjModelPropAttr];
        }
    }

    private _ensureInitEhUnsubscribed() {
        if (this._dirInitEh) {
            this._dirInitEh.unsubscribe();
            this._dirInitEh = null;
        }
    }

    private _dirValChgEh(s: any, e: any) {
        if (this._onChange && this._directive && this._ngModelProp) {
            let dirValue = this._directive[this._ngModelProp];
            if (this._modelValue !== dirValue) {
                this._modelValue = dirValue;
                this._onChange(dirValue);
            }
        }
    }

    private _dirLostFocusEh(s: wjcCore.Control, e: any) {
        if (this._onTouched) {
            this._onTouched();
        }
    }
}

export function WjValueAccessorFactory(/*injector: Injector*/directive: any): WjValueAccessor {
    return new WjValueAccessor(/*injector*/directive);
}

let moduleExports = [
    //WjComponent,
    //WjDirectiveBehavior,
    //WjValueAccessor,
    //Ng2Utils
];
@NgModule({
    //declarations: [...moduleExports],
    //exports: [...moduleExports],
})
export class WjDirectiveBaseModule {
}



