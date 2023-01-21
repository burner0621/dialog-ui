import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "../service";
import { CoreService } from "../core-service";

const UnitLoader = require('../../../../loader/unit-loader');
var CurrencyLoader = require('../../../../loader/currency-loader');
const UnitVBNonPO = require('../../../../loader/unit-vb-non-po-loader');
const VbLoader = require('../../../../loader/vb-request-document-loader');

@containerless()
@inject(Service, BindingEngine, CoreService)
export class DataForm {
  @bindable readOnly = false;
  @bindable data = {};
  @bindable error = {};
  @bindable title;

  @computedFrom("data.VBNonPOType")
  get isVB() {
    return this.data.VBNonPOType == "Dengan Nomor VB";
  }

  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || '').toString() != '';
  }

  filter = {
    "IsApproved": true,
    "IsRealized": false,
    "Type": 2
  };

  controlOptions = {
    label: {
      length: 4
    },
    control: {
      length: 5
    }
  }

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

  unitQuery = { VBDocumentLayoutOrder: 0 }
  get unitVBNonPOLoader() {
    return UnitVBNonPO;
  }

  NumberVbOptions = ["", "Dengan Nomor VB", "Tanpa Nomor VB"];

  itemOptions = {};
  constructor(service, bindingEngine, coreService) {
    this.service = service;
    this.bindingEngine = bindingEngine;
    this.coreService = coreService;
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    if (this.data.VBNonPOType) {
      this.vbNonPOType = this.data.VBNonPOType;
    }

    if (this.data.VBDocument) {
      this.vbDocument = this.data.VBDocument;
    }

    if (this.data.Currency) {
      this.currency = this.data.Currency;
    }

    if (this.data.Unit) {
      this.unit = this.data.Unit;
    }

    if (this.data.UnitCosts) {
      var otherUnit = this.data.UnitCosts.find(s => s.Unit.VBDocumentLayoutOrder == 10);
      if (otherUnit) {
        this.cardContentUnit = otherUnit.Unit;
      }
    }

    if (this.data.UnitCosts) {
      let tempCards = [];
      this.data.UnitCosts.forEach((item, index) => {
        tempCards.push(item);
        if (item.Unit.VBDocumentLayoutOrder % 5 == 0) {
          this.cards.push(tempCards);
          tempCards = [];
        }
      });

      if (tempCards.length > 0) {
        this.cards.push(tempCards)
      }
    }

  }


  cards = [];

  @bindable vbNonPOType;
  async vbNonPOTypeChanged(n, o) {
    if (this.vbNonPOType) {
      this.data.VBNonPOType = this.vbNonPOType;

      if (!this.isEdit) {
        this.vbDocument = null;
        this.unit = null;
        this.currency = null;
        this.data.Items.splice(0, this.data.Items.length);
        this.data.UnitCosts = [];
        this.cards = [];
        if (this.data.VBNonPOType == "Tanpa Nomor VB") {
          let unitCostsResponse = await this.coreService.getWithVBLayoutOrder();
          let unitCosts = unitCostsResponse.data;

          unitCosts.map((unit) => {
            let item = {
              Unit: unit
            }

            this.data.UnitCosts.push(item);
            if (unit.VBDocumentLayoutOrder === 9)
              this.data.UnitCosts.push({
                Unit: {
                  VBDocumentLayoutOrder: 10
                }
              });

          });
        }

        let tempCards = [];
        this.data.UnitCosts.forEach((item, index) => {
          tempCards.push(item);
          if (item.Unit.VBDocumentLayoutOrder % 5 == 0) {
            this.cards.push(tempCards);
            tempCards = [];
          }
        });

        if (tempCards.length > 0) {
          this.cards.push(tempCards)
        }

      }
    }

  }

  @bindable vbDocument;
  async vbDocumentChanged(n, o) {
    if (this.vbDocument) {
      this.cards = [];
      this.data.VBDocument = this.vbDocument;

      if (!this.isEdit && this.vbNonPOType == "Dengan Nomor VB") {
        this.unit = {
          Id: this.data.VBDocument.SuppliantUnitId,
          Code: this.data.VBDocument.SuppliantUnitCode,
          Name: this.data.VBDocument.SuppliantUnitName,
          Division: {
            Id: this.data.VBDocument.SuppliantDivisionId,
            Code: this.data.VBDocument.SuppliantDivisionCode,
            Name: this.data.VBDocument.SuppliantDivisionName
          }
        }
        this.currency = {
          Id: this.data.VBDocument.CurrencyId,
          Code: this.data.VBDocument.CurrencyCode,
          Description: this.data.VBDocument.CurrencyDescription,
          Symbol: this.data.VBDocument.CurrencySymbol,
          Rate: this.data.VBDocument.CurrencyRate
        }
      }


      if (!this.isEdit && this.vbNonPOType == "Dengan Nomor VB") {
        var dataVBRequest = await this.service.getVBDocumentById(this.data.VBDocument.Id);

        this.data.UnitCosts = dataVBRequest.Items;
      }


      if (this.data.UnitCosts) {
        var otherUnit = this.data.UnitCosts.find(s => s.Unit.VBDocumentLayoutOrder == 10);
        if (otherUnit) {
          this.cardContentUnit = otherUnit.Unit;
        }
      }

      let tempCards = [];
      this.data.UnitCosts.forEach((item, index) => {
        tempCards.push(item);
        if (item.Unit.VBDocumentLayoutOrder % 5 == 0) {
          this.cards.push(tempCards);
          tempCards = [];
        }
      });

      if (tempCards.length > 0) {
        this.cards.push(tempCards)
      }

    } else {
      this.data.VBDocument = null;
      this.unit = null;
      this.currency = null;
    }

  }

  @bindable unit;
  unitChanged(n, o) {
    if (this.unit) {
      this.data.Unit = this.unit;
    } else {
      this.data.Unit = null;
    }
  }

  @bindable currency;
  currencyChanged(n, o) {
    if (this.currency) {
      this.data.Currency = this.currency;
      this.itemOptions.CurrencyCode = this.data.Currency.Code;

    } else {
      this.data.Currency = null;
    }
  }

  otherUnitSelected(event, data) {
    this.cardContentUnit = null;
    data.Amount = 0;
    data.Unit = {};
    data.Unit.VBDocumentLayoutOrder = 10;
  }

  resetAmount(event, data) {
    data.Amount = 0;
  }

  @bindable cardContentUnit;
  cardContentUnitChanged(n, o) {
    var otherUnit = this.data.UnitCosts.find(s => s.Unit.VBDocumentLayoutOrder == 10);

    if (this.cardContentUnit && otherUnit && otherUnit.IsSelected) {
      otherUnit.Unit = this.cardContentUnit;
      otherUnit.Unit.VBDocumentLayoutOrder = 10;
    } else {
      if (otherUnit) {
        otherUnit.Amount = 0;
        otherUnit.Unit = {};
        otherUnit.Unit.VBDocumentLayoutOrder = 10;
      }

    }
  }
  columns = [
    "Tanggal", "Keterangan", "Jumlah", "Kena PPN", "PPh", "Total"
  ];

  get addItems() {
    return (event) => {
      this.data.Items.push({
        Amount: 0,
        Total: 0
      })
    };
  }

  get vbLoader() {
    return VbLoader;
  }

  unitView = (unit) => {
    return `${unit.Code} - ${unit.Name}`
  }

  get unitLoader() {
    return UnitLoader;
  }

  get currencyLoader() {
    return CurrencyLoader;
  }

}
