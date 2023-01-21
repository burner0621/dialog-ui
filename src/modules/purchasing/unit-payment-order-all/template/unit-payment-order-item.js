import {bindable} from 'aurelia-framework'
var UnitReceiptNoteLoader = require('../../../../loader/unit-receipt-note-loader');

export class UnitPaymentOrderItem {
  @bindable selectedUnitReceiptNote;

  itemsColumns = [
    { header: "No PO External" },
    { header: "Barang" },
    { header: "Jumlah" },
    { header: "Satuan" },
    { header: "Harga Satuan" },
    { header: "Total Harga" }
  ]

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.filterUPO = this.context.context.options ? this.context.context.options : {};
    this.isShowing = false;
    if (this.data) {
      this.selectedUnitReceiptNote = this.data.unitReceiptNote;
      if (this.data.unitReceiptNote.items) {
        this.isShowing = true;
      }
    }
    this.filter = {
            DivisionId: this.filterUPO.DivisionId,
            SupplierId: this.filterUPO.SupplierId ,
            CategoryId: this.filterUPO.CategoryId,
            PaymentMethod: this.filterUPO.PaymentMethod,
            CurrencyCode: this.filterUPO.CurrencyCode ,
            UseIncomeTax: this.filterUPO.UseIncomeTax,
            IncomeTaxId: this.filterUPO.IncomeTaxId,
            UseVat: this.filterUPO.UseVat,
        }
  }

  get unitReceiptNoteLoader() {
    return UnitReceiptNoteLoader;
  }

  selectedUnitReceiptNoteChanged(newValue) {
    if (newValue === null) {
      this.data.unitReceiptNote = {};
      this.error = {};
      this.isShowing = false;
    } else if (newValue._id) {
      var items = [];
      for (var item of newValue.items) {
        if(item.incomeTaxBy==this.filterUPO.incomeTaxBy && item.categoryCode==this.filterUPO.CategoryCode){
          item.URNItemId = item._id;

          delete item._id;
          delete item.Id;
          delete item.Active;
          delete item.CreatedAgent;
          delete item.CreatedBy;
          delete item.CreatedUtc;
          delete item.IsDeleted;
          delete item.LastModifiedAgent;
          delete item.LastModifiedBy;
          delete item.LastModifiedUtc;

          item.deliveredUom = {
          _id: item.uomId,
          unit: item.uom 
          };
          
          item.EPONo=item.epoNo;
          item.PriceTotal = (item.pricePerDealUnit * item.deliveredQuantity).toLocaleString('en-EN', { maximumFractionDigits:15 });
          // item.PricePerDealUnitCorrection = item.pricePerDealUnit;
          // item.PriceTotalCorrection = item.PriceTotal;
          // item.QuantityCorrection= item.deliveredQuantity;
          items.push(item);
        }
      }
      newValue.items = items;

      this.data.unitReceiptNote = newValue;
      this.data.unitReceiptNote.deliveryOrder = {
        _id: newValue.doId || 0,
        no: newValue.doNo || null,
      };

      this.error = {};
      this.isShowing = true;
      console.log(newValue)
    }
  }

  toggle() {
    if (!this.isShowing)
      this.isShowing = true;
    else
      this.isShowing = !this.isShowing;
  }

  unitReceiptNoteView = (unitReceiptNote) => {
    return unitReceiptNote.deliveryOrder ?
      `${unitReceiptNote.no} - ${unitReceiptNote.deliveryOrder.no}` :
      unitReceiptNote.doNo ?
      `${unitReceiptNote.no} - ${unitReceiptNote.doNo}` :
      "";
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}