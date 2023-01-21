import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
var moment = require('moment');
import { Service } from './service';


var FinishingPrintingSalesContractLoader = require('../../../loader/finishing-printing-sales-contract-loader');
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

  @computedFrom("data.Buyer")
  get buyerType() {
    this.ekspor = false;
    if (this.data.Buyer) {
      if (this.data.Buyer.Type.toLowerCase() == "ekspor" || this.data.Buyer.Type.toLowerCase() == "export") {
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

  @computedFrom("data.OrderType")
  get isPrinting() {
    this.printing = false;
    if (this.data.OrderType) {
      if (this.data.OrderType.Name.trim().toLowerCase() == "printing") {
        this.printing = true;
      }
    }
    return this.printing;
  }

  @computedFrom("data.OrderType")
  get isYarnDyed() {
    this.yarndyed = false;
    if (this.data.OrderType) {
      if (this.data.OrderType.Name.trim().toLowerCase() == "yarn dyed") {
        this.yarndyed = true;
      }
    }
    return this.yarndyed;
  }

  @computedFrom("data.OrderType")
  get isPrintingOnly() {
    this.printingOnly = false;
    if (this.data.OrderType) {
      if (this.data.OrderType.Name.toLowerCase() == "printing") {
        this.printingOnly = true;
      }
    }
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

  SalesContractChanged(e) {
    if (this.SalesContract) {
      if (this.data && this.data.Details && this.data.Details.length > 0) {
        var count = this.data.Details.length;

        for (var a = count; a >= 0; a--) {
          this.data.Details.splice((a - 1), 1);
        }

      }
      this.data.FinishingPrintingSalesContract = this.SalesContract;
      this.data.Buyer = this.data.FinishingPrintingSalesContract.Buyer;
      this.data.OrderType = this.data.FinishingPrintingSalesContract.OrderType;
      this.OrderType = this.data.OrderType;
      this.data.Material = this.data.FinishingPrintingSalesContract.Material;
      this.Material = this.data.Material;
      this.data.YarnMaterial = this.data.FinishingPrintingSalesContract.YarnMaterial;
      this.data.DesignMotive = this.data.FinishingPrintingSalesContract.DesignMotive;
      if (this.data.Uom) {
        this.data.Uom.Unit = this.data.Uom.Unit;
      }
      else {
        this.data.Uom = {};
        this.data.Uom.Unit = "MTR";
      }
      this.data.FinishWidth = this.SalesContract.MaterialWidth;
      this.data.BeforeQuantity = 0;
      if (this.data.FinishingPrintingSalesContract.RemainingQuantity != undefined) {
        // this.data.RemainingQuantity = this.data.SalesContract.RemainingQuantity ? this.data.SalesContract.RemainingQuantity:0;
        this.rq = true;
      }
      else {
        // this.data.RemainingQuantity = undefined;
        this.rq = false;
      }
    } else {
      this.data = {};
      this.data = null;
    }
  }

  getBuyerText = (text) => {
    var data = text.Code ? `${text.Code} - ${text.Name}` : "";
    return data
  }

  OrderTypeChanged() {
    if (this.OrderType) {
      if (!this.readOnly) {
        this.data.ProcessType = {};
        this.data.Details.length = 0;
      }
      var code = this.OrderType.Code;
      if (code) {
        this.filterOrder = {
          "OrderTypeCode": code
        };
      }
      if (this.OrderType.Name) {
        if (this.OrderType.Name.toLowerCase() == "printing") {
          this.printingOnly = true;
        }
        else {
          this.printingOnly = false;
        }
        if (this.OrderType.Name.toLowerCase() == "printing") {
          this.printing = true;
        }
        else {
          this.printing = false;
        }
        if (this.OrderType.Name.toLowerCase() == "yarn dyed") {
          this.yarndyed = true;
        }
        else {
          this.yarndyed = false;
        }

      }
    }
    else {
      if (!this.readOnly) {
        this.data.ProcessType = {};
        this.data.Details = [];
      }
      var code = this.data.OrderType.Code;
      if (this.data.OrderType && code) {
        this.filterOrder = {
          "OrderTypeCode": code
        };
      }
      if (this.data != null) {
        if (this.data.OrderType) {
          if (this.data.OrderType.Name.toLowerCase() == "printing" || this.data.OrderType.Name.toLowerCase() == "yarn dyed") {
            this.printing = true;
          }
          else {
            this.printing = false;
          }
          if (this.data.OrderType.Name.toLowerCase() == "printing") {
            this.printingOnly = true;
          }
          else {
            this.printingOnly = false;
          }
        }
      }

    }
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
        this.data.RunWidth[0] = 0;
        if (this.data.RunWidth.length == 0) {
          this.data.RunWidth[0] = 0;
        }

      }
      if (selectedRUN == "2 RUN") {
        this.run = true;
        this.data.RunWidth.length = 0;
        if (this.data.RunWidth.length == 0) {
          this.data.RunWidth.push(0, 0);
        }
      }
      if (selectedRUN == "3 RUN") {
        this.run = true;
        this.data.RunWidth.length = 0;
        if (this.data.RunWidth.length == 0) {
          this.data.RunWidth.push(0, 0, 0);
        }
      }
      if (selectedRUN == "4 RUN") {
        this.run = true;
        this.data.RunWidth.length = 0;
        if (this.data.RunWidth.length == 0) {
          this.data.RunWidth.push(0, 0, 0, 0);
        }
      }

    }
  }


  accountChanged(e) {
    var selectedAccount = this.account;
    if (selectedAccount) {

      this.data.Account = {
        // Id: 1, //test auth
        Username: selectedAccount.username,
        FirstName: selectedAccount.profile.firstname,
        LastName: selectedAccount.profile.lastname,
        Gender: selectedAccount.profile.gender,
        // Roles: [],
      };

      // for (var item of selectedAccount.roles) {
      //   var role = {
      //     Name: item.name,
      //     Code: item.code,
      //     Description: item.description
      //   }
      //   this.data.Account.Roles.push(role);
      // }
    }
  }
  // NEW CODE

  scFields = ["salesContractNo"];
  async bind() {
    this.data = this.data || {};
    this.data.LampStandards = this.data.LampStandards || [];
    this.data.Details = this.data.Details || [];
    this.data.BeforeQuantity = this.data.OrderQuantity;
    if (this.data.Uom) {
      this.data.Uom.Unit = this.data.Uom.Unit;
    }
    else {
      this.data.Uom = {};
      this.data.Uom.Unit = "MTR";
    }
    // if (this.data) {
    //   if (this.data.FinishingPrintingSalesContract && this.data.FinishingPrintingSalesContract.Id) {
    //     this.selectedSC = await this.service.getSCbyId(encodeURIComponent(this.data.SalesContractNo), this.scFields);
    //     this.data.FinishingPrintingSalesContract = this.selectedSC;
    //     if (this.data.FinishingPrintingSalesContract.RemainingQuantity != undefined) {
    //       // this.data.RemainingQuantity = this.data.SalesContract.RemainingQuantity;
    //       this.rq = true;
    //     }
    //     // this.selectedMaterial = this.data.material;
    //   }

    // }
  }

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
    if (!this.printing && !this.yarndyed) {
      return [{ header: "Acuan Warna/Desain" }, { header: "Warna Yang Diminta" }, { header: "Jenis Warna" }, { header: "Jumlah" }, { header: "Satuan" }];
    }
    else {
      return [{ header: "Acuan Warna/Desain" }, { header: "Warna Yang Diminta" }, { header: "Jumlah" }, { header: "Satuan" }];
    }
  }

  get removeLamp() {
    return (event) => console.log(event);
  }

  get addDetailnonPrinting() {
    return (event) => {
      var newDetail = {
        Uom: this.data.Uom,
        // uomId: this.data.uom._id,
        ColorRequest: '',
        ColorTemplate: '',
        Quantity: 0,
        Printing: this.isPrinting
      };
      this.data.Details.push(newDetail);
    };
  }

  get addDetailPrintingYarnDyed() {
    return (event) => {
      var newDetail = {
        Uom: this.data.Uom,
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

}
