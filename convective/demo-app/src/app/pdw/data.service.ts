import {Injectable} from '@angular/core';
import {Item} from './models/Item';
import {ItemSummary} from './models/ItemSummary';

@Injectable()
export class DataService {
  items: Item[];
  pricingUnits: string[];

  constructor() {
    this.pricingUnits = ['CASE', 'CWT'];
    this.items = [
      {
        id: '31387',
        description: '192/3 SHURFINE CENT AST GEL',
        orderable: true,
        pricingUnit: 'CASE',
        status: 'ACTIVE'
      },
      {
        id: '28572',
        description: '35/3-8PK DC NDC PALLET',
        orderable: true,
        pricingUnit: 'CASE',
        status: 'ACTIVE'
      },
      {
        id: '41412',
        description: 'BLEND BEEF STEW 7.5 OZ CUP',
        orderable: false,
        pricingUnit: 'CWT',
        status: 'ACTIVE'
      },
      {
        id: '06401',
        description: 'BLEND CHKN & PORK VIENNA',
        orderable: false,
        pricingUnit: 'CWT',
        status: 'ACTIVE'
      },
      {
        id: '33621',
        description: 'BLEND-PRIVATE LABEL CNB',
        orderable: false,
        pricingUnit: 'CWT',
        status: 'ACTIVE'
      },
      {
        id: '45806',
        description: 'BNLS BF TRIM 85% LN FZ',
        orderable: false,
        pricingUnit: 'CWT',
        status: 'ACTIVE'
      },
      {
        id: '87137',
        description: 'CANSTY BCN CMK SL FCKD12933',
        orderable: false,
        pricingUnit: '',
        status: 'ACTIVE'
      },
      {
        id: '30164',
        description: 'CHILLED 11/13 HC&T BELLY LS',
        orderable: false,
        pricingUnit: 'CWT',
        status: 'ACTIVE'
      },
      {
        id: '29499',
        description: 'CHILLED 11/13 SS HCT BELLY',
        orderable: false,
        pricingUnit: 'CWT',
        status: 'ACTIVE'
      },
      {
        id: '25506',
        description: 'CHILLED 13/14 DUBUQ HCTBLY',
        orderable: false,
        pricingUnit: 'CWT',
        status: 'ACTIVE'
      }
    ];
  }

  getPricingUnits(): string[] {
    return this.pricingUnits;
  }

  getItems(): Item[] {
    return this.items;
  }

  getItemIdsAndDescriptions(): ItemSummary[] {
    const results: ItemSummary[] = [];
    this.items.map((item: Item) => results.push({id: item.id, description: item.description}));
    return results;
  }
}
