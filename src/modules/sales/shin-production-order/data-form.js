import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
var moment = require('moment');
import { Service } from './service';


var FinishingPrintingSalesContractLoader = require('../../../loader/shin-finishing-printing-sales-contract-loader');
var YarnMaterialLoader = require('../../../loader/yarn-material-loader');
var ProcessTypeLoader = require('../../../loader/process-type-loader');
var DesignMotiveLoader = require('../../../loader/design-motive-loader');
var MaterialConstructionLoader = require('../../../loader/material-construction-loader');
var FinishTypeLoader = require('../../../loader/finish-type-loader');
var StandardTests = require('../../../loader/standard-tests-loader');
var AccountLoader = require('../../../loader/account-loader');

@inject(BindingEngine, Element, Service)
export class DataForm {
  @bindable readOnly = false;
  @bindable data = {};
  @bindable error = {};
  @bindable SalesContract;
  @bindable OrderType;
  @bindable Material;
  @bindable account;
  @bindable orderQuantity;
  @bindable shippingQuantityTolerance;
  lampHeader = [{ header: "Standar Lampu" }];

  RUNOptions = ['Tanpa RUN', '1 RUN', '2 RUN', '3 RUN', '4 RUN'];
  rq = false;



  constructor(bindingEngine, element, service) {
    this.bindingEngine = bindingEngine;
    this.element = element;
    this.service = service;

    this.filterAccount = {
      "roles": {
        "$elemMatch": {
          "permissions": {
            "$elemMatch": {
              "unit.name": "PENJUALAN FINISHING & PRINTING"
            }
          }
        }
      }
    };

    this.filterMaterial = {
      "tags": "material"
    }
  }

  async bind() {

    if (this.data && this.data.Id) {

      this.account = {
        username: this.data.Account.UserName,
        profile: {
          firstname: this.data.Account.FirstName,
          lastname: this.data.Account.LastName,
        }
      }

      if (this.data.FinishingPrintingSalesContract) {
        this.SalesContract = this.data.FinishingPrintingSalesContract;
      }

      this.data.Details = this.data.Details || [];
      this.data.LampStandards = this.data.LampStandards || [];

    } else {
      this.data.Details = [];
      this.data.LampStandards = [];
    }
  }

  @computedFrom("data.BuyerType")
  get buyerType() {
    this.ekspor = false;
    if (this.data.Buyer) {
      if (this.data.BuyerType.toLowerCase() == "ekspor" || this.data.BuyerType.toLowerCase() == "export") {
        this.ekspor = true;
      }
    }
    return this.ekspor;
  }

  get fpSalesContractLoader() {
    return FinishingPrintingSalesContractLoader;
  }

  @computedFrom("data.Id")
  get isEdit() {
    return (this.data ? this.data.Id : "" || '').toString() != '';
  }

  @computedFrom("data.Unit")
  get isPrinting() {

    this.printing = this.data.Unit && this.data.Unit.trim().toLowerCase() == "printing";
    return this.printing;
  }


  @computedFrom("data.Unit")
  get isPrintingOnly() {
    this.printingOnly = this.data.Unit && this.data.Unit.trim().toLowerCase() == "printing";
    return this.printingOnly;
  }


  @computedFrom("data")
  get isRUN() {
    this.run = false;
    if (this.data.RunWidth) {
      if (this.data.RunWidth.length > 0)
        this.run = true;
    }
    return this.run;
  }

  SalesContractChanged(newVal, oldVal) {

    if (newVal) {
      console.log(newVal)
      this.data.FinishingPrintingSalesContract = newVal;
      this.data.Buyer = this.data.FinishingPrintingSalesContract.PreSalesContract.Buyer.Name;
      this.data.Unit = this.data.FinishingPrintingSalesContract.PreSalesContract.Unit ?
        this.data.FinishingPrintingSalesContract.PreSalesContract.Unit.Name : "";
      this.data.BuyerType = this.data.FinishingPrintingSalesContract.PreSalesContract.Buyer.Type;
      this.data.ProcessType = this.data.FinishingPrintingSalesContract.PreSalesContract.ProcessType ? this.data.FinishingPrintingSalesContract.PreSalesContract.ProcessType.Name : null;
      // this.data.OrderNo = this.data.FinishingPrintingSalesContract.ProductionOrderNo;
      this.data.OrderType = this.data.FinishingPrintingSalesContract.PreSalesContract.ProcessType && this.data.FinishingPrintingSalesContract.PreSalesContract.ProcessType.OrderType ? this.data.FinishingPrintingSalesContract.PreSalesContract.ProcessType.OrderType.Name : null;

      this.data.Material = this.data.FinishingPrintingSalesContract.Material.Name;
      // this.data.MaterialConstruction = this.data.FinishingPrintingSalesContract.MaterialConstruction.Name;
      this.Material = this.data.Material;
      this.data.YarnMaterial = this.data.FinishingPrintingSalesContract.YarnMaterial.Name;
      // this.data.MaterialWidth = this.data.FinishingPrintingSalesContract.MaterialWidth;
      if (this.data.Id) {

        this.orderQuantity = this.data.OrderQuantity;
      } else {

        this.orderQuantity = this.data.FinishingPrintingSalesContract.PreSalesContract.OrderQuantity;
      }
      this.data.OrderQuantity = this.orderQuantity;
      this.data.UOM = this.data.FinishingPrintingSalesContract.UOM.Unit;
      this.shippingQuantityTolerance = this.data.FinishingPrintingSalesContract.ShippingQuantityTolerance;
      this.data.ShippingQuantityTolerance = this.shippingQuantityTolerance;
      this.data.Quality = this.data.FinishingPrintingSalesContract.Quality ?
        this.data.FinishingPrintingSalesContract.Quality.Name : "";
      this.data.SalesContractType = this.data.FinishingPrintingSalesContract.PreSalesContract.Type;
      this.data.Packing = this.data.FinishingPrintingSalesContract.Packing;
      this.data.DeliveryDate = this.data.FinishingPrintingSalesContract.DeliverySchedule
      this.account = this.data.FinishingPrintingSalesContract.Sales;



      if (!this.data.Id) {
        this.data.Details = [];
        for (var item of this.data.FinishingPrintingSalesContract.Details) {
          var newDetail = {
            Uom: this.data.FinishingPrintingSalesContract.UOM,
            // uomId: this.data.uom._id,
            ColorRequest: item.Color,
            ColorTemplate: '',
            Quantity: 0,
            Printing: this.isPrinting,
            ProductionOrderNo: item.ProductionOrderNo
          };
          this.data.Details.push(newDetail);
        }
      }

    } else {
      this.data = {};
      this.data.Details = [];
      this.data.LampStandards = [];
    }
  }

  getBuyerText = (text) => {
    var data = text.Code ? `${text.Code} - ${text.Name}` : "";
    return data
  }

  getSCText = (text) => {
    return text.SalesContractNo;
  }

  RUNChanged(e) {
    var selectedRUN = e.srcElement.value;
    if (selectedRUN) {
      this.data.RunWidth = [];
      if (selectedRUN == "Tanpa RUN") {
        this.run = false;
        this.data.RunWidth.length = 0;
      }
      if (selectedRUN == "1 RUN") {

        this.run = true;
        this.data.RunWidth[0] = { Value: 0 };
        if (this.data.RunWidth.length == 0) {
          this.data.RunWidth[0] = { Value: 0 };
        }

      }
      if (selectedRUN == "2 RUN") {
        this.run = true;
        this.data.RunWidth.length = 0;
        if (this.data.RunWidth.length == 0) {
          this.data.RunWidth.push({ Value: 0 }, { Value: 0 });
        }
      }
      if (selectedRUN == "3 RUN") {
        this.run = true;
        this.data.RunWidth.length = 0;
        if (this.data.RunWidth.length == 0) {
          this.data.RunWidth.push({ Value: 0 }, { Value: 0 }, { Value: 0 });
        }
      }
      if (selectedRUN == "4 RUN") {
        this.run = true;
        this.data.RunWidth.length = 0;
        if (this.data.RunWidth.length == 0) {
          this.data.RunWidth.push({ Value: 0 }, { Value: 0 }, { Value: 0 }, { Value: 0 });
        }
      }

    }
  }


  accountChanged(e) {
    var selectedAccount = this.account;
    if (selectedAccount) {

      this.data.Account = {
        Username: selectedAccount.username,
        FirstName: selectedAccount.profile.firstname,
        LastName: selectedAccount.profile.lastname,
        Gender: selectedAccount.profile.gender,

      };


    }
  }
  // NEW CODE

  get addLamp() {
    return (event) => {
      var LampStandards = {
        LampStandardId: 0,
        Name: "",
        Code: "",
        Description: "",
      };
      this.data.LampStandards.push(LampStandards);
    };
  }

  get detailHeader() {
    if (!this.printing) {
      return [{ header: "Acuan Warna/Desain" }, { header: "Warna Yang Diminta" }, { header: "Jenis Warna" }, { header: "Jumlah" }, { header: "Satuan" }];
    }
    else {
      return [{ header: "Acuan Warna/Desain" }, { header: "Warna Yang Diminta" }, { header: "Jumlah" }, { header: "Satuan" }];
    }
  }

  get removeLamp() {
    return (event) => console.log(event);
  }


  get addDetail() {
    return (event) => {
      var newDetail = {
        Uom: this.data.FinishingPrintingSalesContract.UOM,
        // uomId: this.data.uom._id,
        ColorRequest: '',
        ColorTemplate: '',
        Quantity: 0,
        Printing: this.isPrinting
      };
      this.data.Details.push(newDetail);
    };
  }

  get designMotiveLoader() {
    return DesignMotiveLoader;
  }

  get processTypeLoader() {
    return ProcessTypeLoader;
  }

  get materialConstructionLoader() {
    return MaterialConstructionLoader;
  }

  get finishTypeLoader() {
    return FinishTypeLoader;
  }

  get standardTests() {
    return StandardTests;
  }

  get accountLoader() {
    return AccountLoader;
  }

  text = (data) => {
    return `${data.profile.firstname} - ${data.profile.lastname}`
  }

}
