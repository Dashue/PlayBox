

import * as wjcMetafactory from 'wijmo/wijmo.metaFactory';



/*
    *
    * Wijmo Library 5.20172.328
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the Wijmo Commercial License.
    * sales@wijmo.com
    * wijmo.com/products/wijmo-5/license/
    *
    */
///<amd-module name='wijmo/wijmo.angular2.metaFactory'/>

//import { wjMetaBase } from "wijmo/wijmo.metaFactory";
import * as wjMetaBase from "wijmo/wijmo.metaFactory";

//export module wj.angular2 {
'use strict';
export class MetaFactory extends wjcMetafactory.ControlMetaFactory {
    // Override to return wijmo.knockout.PropDesc
    public static CreateProp(propertyName: string, propertyType: wjcMetafactory.PropertyType,
            changeEvent?: string, enumType?,
            isNativeControlProperty?: boolean, priority?: number): PropDesc {

            return new PropDesc(propertyName, propertyType, changeEvent, enumType, isNativeControlProperty, priority);
        }

        // Override to return wijmo.knockout.EventDesc
        public static CreateEvent(eventName: string, isPropChanged?: boolean): EventDesc {
            return new EventDesc(eventName, isPropChanged);
        }

        // Override to return wijmo.knockout.ComplexPropDesc
        public static CreateComplexProp(propertyName: string, isArray: boolean, ownsObject?: boolean): ComplexPropDesc {
            return new ComplexPropDesc(propertyName, isArray, ownsObject);
        }

        // Typecasted override.
        public static findProp(propName: string, props: PropDesc[]): PropDesc {
            return <PropDesc>wjcMetafactory.ControlMetaFactory.findProp(propName, props);
        }

        // Typecasted override.
        public static findEvent(eventName: string, events: EventDesc[]): EventDesc {
            return <EventDesc>wjcMetafactory.ControlMetaFactory.findEvent(eventName, events);
        }

        // Typecasted override.
        public static findComplexProp(propName: string, props: ComplexPropDesc[]): ComplexPropDesc {
            return <ComplexPropDesc>wjcMetafactory.ControlMetaFactory.findComplexProp(propName, props);
        }

    }

    export class PropDesc extends wjcMetafactory.PropDescBase {
    }

    // Describes a scope event
    export class EventDesc extends wjcMetafactory.EventDescBase {
    }

    // Describe property info for nested directives.
    export class ComplexPropDesc extends wjcMetafactory.ComplexPropDescBase {
    }
//}

//export var wjNg2Meta = wj.angular2;
//export type ComplexPropDesc = wj.angular2.ComplexPropDesc;

