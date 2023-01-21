import { inject, bindable, containerless, BindingEngine, computedFrom } from 'aurelia-framework'
import { Service } from "../service";

@containerless()
@inject(BindingEngine, Service)
export class BalanceDebtItem {
  @bindable deliveryOrder;
  constructor(bindingEngine, service) {
    this.bindingEngine = bindingEngine;
    this.service = service;
  }
  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.isShowing = false;
    this.options = context.context.options;
    this.filter = {};
    this.year = context.context.options.Year;
    console.log(this.context);
    if (this.context.context.options.supplierId && this.context.context.options.currencyCode){
      this.filter = {
        "SupplierId": this.context.context.options.supplierId,
        "DOCurrencyCode": this.context.context.options.currencyCode
      }
    }

    for (var item of this.context.context.items) {
      if (item.data.deliveryOrder) {
        this.filter[`Id == "${item.data.deliveryOrder.Id}"`] = false;
      }
    }
      
    // if (this.data.garmentInvoice && this.data.garmentInvoice.invoiceNo) {
    //   this.invoice = this.data.garmentInvoice;
    //   this.data.garmentInvoice.totalAmount = this.data.garmentInvoice.totalAmount.toLocaleString('en-EN', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    // }

    // this.filter = {};
    // if (this.options.supplierId && this.options.currencyCode) {
    //   this.filter = { "HasInternNote": false, "supplierId": this.options.supplierId, "IsDeleted": false, "currencyCode": this.options.currencyCode };
    // }
    // for (var inv of this.context.context.items) {
    //   if (inv.data.garmentInvoice)
    //     this.filter[`invoiceNo == "${inv.data.garmentInvoice.invoiceNo}"`] = false;
    // }
    

  if (this.data) {
    this.deliveryOrder = this.data.deliveryOrder;
    //console.log(this.selectedBillNo);
  }
}

  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || '').toString() != '';
  }
  deliveryOrderChanged(newValue, oldValue) {
     //console.log(this.selectedBillNo)
     if (this.deliveryOrder && this.deliveryOrder.Id) {
      //  this.data.Id = this.selectedBillNo.Id;
      //  this.data.billNo = this.selectedBillNo.bilNo;
       //this.data.arrivalDate = this.selectedBillNo.arrivalDate;
      // this.deliveryOrder.totalAmount=  this.deliveryOrder.totalAmount.toLocaleString('en-EN', { maximumFractionDigits: 2,minimumFractionDigits:2});
      //  this.totalAmount = this.selectedBillNo.totalAmount.toLocaleString('en-EN', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
       //this.data.totalAmount = this.selectedBillNo.totalAmount;
       this.data.deliveryOrder = this.deliveryOrder;
    }
    else {

      this.data.deliveryOrder = undefined;
      // this.data.Id = "";
      // this.data.billNo = "";
      // this.data.doNo = "";
      // this.data.currency = "";
      // this.data.doDate = undefined;
    }
  }
      get BPLoader() {
        return (keyword) => {
          var info = {
            keyword: keyword,
            select: JSON.stringify({ "billNo": "BillNo", "Id": "1", "dONo" : "DONo", "supplierName": "SupplierName", "internNo": "InternNo", "arrivalDate" : "ArrivalDate", "paymentType" : "PaymentType", "paymentMethod" : "paymentMethod" }),
            search: JSON.stringify(["BillNo"]),
            order: { "BillNo": "asc" },
            year: this.year,
            filter: JSON.stringify(this.filter)
          };
          return this.service.searchDeliveryOrder(info)
            .then((result) => {
              return result.data
              // .map(data => {
              //   data.toString = function () { return `${this.billNo} - ${this.dONo}`; };
              //   return data;
              // });
            });
        }
      }

  DOView = (deliveryOrder) => {
    console.log(deliveryOrder);
    if (!deliveryOrder.Id)
      return `${deliveryOrder.BillNo} - ${deliveryOrder.DONo}`
    else
      return `${deliveryOrder.billNo} - ${deliveryOrder.dONo}`
  }
    
  }



