import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
import moment from 'moment';

const CurrencyLoader = require('../../../loader/currency-in-garment-currency-loader');
const UnitVBNonPO = require('../../../loader/unit-vb-non-po-loader');
const UnitLoader = require('../../../loader/unit-loader');

@inject(Service)
export class DataForm {
  @bindable title;
  @bindable readOnly;

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah",
  };

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

  controlOptionsLabel = {
    label: {
      length: 8
    },
    control: {
      length: 3
    }
  }

  controlOptionsDetail = {
    control: {
      length: 10
    }
  }

  cards = [];

  constructor(service) {
    this.service = service;
  }

  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || '').toString() != '';
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
    this.hasPosting = this.context.hasPosting;

    if (this.data.Items) {
      var uCosts=[];
      for(var item of this.data.Items){
          if(item.IsSelected){
              uCosts.push(item);
          }
      }
      this.data.Items=uCosts;
    }
    // if (this.data.Items) {
    //   var otherUnit = this.data.Items.find(s => s.Unit.VBDocumentLayoutOrder == 10);
    //   if (otherUnit) {
    //     this.cardContentUnit = otherUnit.Unit;
    //   }
    // }

    // let tempCards = [];
    // this.data.Items.forEach((item, index) => {
    //   tempCards.push(item);
    //   if (item.Unit.VBDocumentLayoutOrder % 5 == 0) {
    //     this.cards.push(tempCards);
    //     tempCards = [];
    //   }
    // });

    // if (tempCards.length > 0) {
    //   this.cards.push(tempCards)
    // }

  }

  get currencyLoader() {
    return CurrencyLoader;
  }

  unitQuery = { VBDocumentLayoutOrder: 0 }
  get unitVBNonPOLoader() {
    return UnitVBNonPO;
  }

  // otherUnitSelected(event, data) {
  //   this.cardContentUnit = null;
  //   data.Unit = {};
  //   data.Unit.VBDocumentLayoutOrder = 10;
  //   // if (data.IsSelected) {
  //   //   data.Unit.VBDocumentLayoutOrder = 10;
  //   // } else {
  //   //   data.Unit = {};
  //   //   data.Unit.VBDocumentLayoutOrder = 10;
  //   // }
  // }

  unitView = (unit) => {
    return `${unit.Code} - ${unit.Name}`;
  }

  currencyView = (currency) => {
    return `${currency.Code}`;
  }

  get unitLoader() {
    return UnitLoader;
  }

  // @bindable cardContentUnit;
  // cardContentUnitChanged(n, o) {
  //   var otherUnit = this.data.Items.find(s => s.Unit.VBDocumentLayoutOrder == 10);

  //   if (this.cardContentUnit && otherUnit && otherUnit.IsSelected) {
  //     otherUnit.Unit = this.cardContentUnit;
  //     otherUnit.Unit.VBDocumentLayoutOrder = 10;
  //   } else {
  //     if (otherUnit) {
  //       otherUnit.Unit = {};
  //       otherUnit.Unit.VBDocumentLayoutOrder = 10;
  //     }
  //   }
  // }

  itemColumns = [
    "Unit",
  ];

  get addItems() {
    return (event) => {
        this.data.Items.push({ });
    };
  }
}
