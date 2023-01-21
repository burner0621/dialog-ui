import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
import { Service } from './service';

import CostCalculationLoader from "../../../loader/finishing-printing-cost-calculation-loader";
import BuyersLoader from "../../../loader/buyers-loader";
import ComodityLoader from "../../../loader/comodity-loader";
import OrderTypeLoader from "../../../loader/order-type-loader";
import MaterialConstructionLoader from "../../../loader/material-loader";
import MaterialLoader from "../../../loader/product-loader";
import YarnMaterialLoader from "../../../loader/yarn-material-loader";
import DesignMotiveLoader from "../../../loader/design-motive-loader";
import UomLoader from "../../../loader/uom-loader";
import QualityLoader from "../../../loader/quality-loader";
import TermOfPaymentLoader from "../../../loader/term-of-payment-loader";
import AccountBankLoader from "../../../loader/account-banks-loader";
import PreSalesContractLoader from "../../../loader/finishing-printing-pre-sales-contract-loader";

@inject(BindingEngine, Service, Element)
export class DataForm {
  @bindable isCreate = false;
  @bindable orderQuantity;
  @bindable readOnly = false;
  @bindable data = {};
  @bindable error = {};
  @bindable selectedCostCalculation;
  @bindable selectedPreSalesContract;
  @bindable itemsOptions = {};
  lampHeader = [{ header: "Standar Lampu" }];

  pointSystemOptions = [10, 4];
  dataCC = [];
  isExport = false;
  filterMaterial = {
    "tags": { "$in": ["MATERIAL", "material", "Material"] }
  };

  filterpayment = {
    "isExport": false
  };

  materialQuery = {
    "Tags": "MATERIAL"
  }
  ccQuery = {
    "IsPosted": true,
    "IsSCCreated": false
  }

  preSCQuery = {
    "IsPosted": true
  }

  constructor(bindingEngine, service, element) {
    this.bindingEngine = bindingEngine;
    this.element = element;
    this.service = service;
  }

  bind(context) {
    this.context = context;
    this.data = context.data;

    if (!this.data.Date) {

      this.data.Date = new Date().toLocaleString();
    }
    this.error = context.error;
    this.itemsOptions = {
      isUseIncomeTax: true,
      UnitName: this.data.PreSalesContract ? this.data.PreSalesContract.Unit.Name : ""
    };

    if(this.data.dataCC){
      this.dataCC = this.data.dataCC;
    }
    if (this.data.PreSalesContract) {
      this.selectedPreSalesContract = this.data.PreSalesContract;
      this.isPrinting = this.data.PreSalesContract.Unit.Name === "PRINTING";

    }

    if (this.data.Details) {

      for (var item of this.data.Details) {
        item.isUseIncomeTax = true;
      }
    }
    // this.selectedBuyer = this.data.Buyer || null;
    // this.selectedOrderType = this.data.OrderType || null;
    this.selectedAccountBank = this.data.AccountBank || null;
    this.selectedUseIncomeTax = this.data.UseIncomeTax || false;
    this.selectedPointSystem = this.data.PointSystem || 10;
  }

  async selectedPreSalesContractChanged(newValue, oldValue) {
    if (newValue) {
      this.data.PreSalesContract = newValue;
      this.data.Buyer = newValue.Buyer.Name;
      this.data.Unit = newValue.Unit.Name;
      this.data.SalesContractType = newValue.Type;
      this.orderQuantity = newValue.OrderQuantity;
      this.itemsOptions.UnitName = newValue.Unit.Name;
      this.isPrinting = this.data.PreSalesContract.Unit.Name === "PRINTING";
      if (newValue.Buyer.Type && (newValue.Buyer.Type.toLowerCase() == "ekspor" || newValue.Buyer.Type.toLowerCase() == "export")) {
        this.filterpayment = {
          "isExport": true
        };
        this.isExport = true;
      } else {
        this.filterpayment = {
          "isExport": false
        };
        this.isExport = false;
      }
      console.log("test2");
      this.dataCC = await this.service.getCCbyPreSC(this.data.PreSalesContract.Id);
      if (this.dataCC.length > 0) {

        this.data.Material = this.dataCC[0].Material;
        this.data.UOM = this.dataCC[0].UOM;
        this.data.TransportFee = this.dataCC[0].FreightCost;
        this.data.Sales = this.dataCC[0].Sales;
        this.itemsOptions.ScreenCost = this.dataCC[0].ScreenCost;
      } else {
        this.error.PreSalesContract = "This Pre Sales Contract doesn't have any Cost Calculation"
      }
    } else {
      this.data.Buyer = null;
      this.data.Unit = null;
      this.data.SalesContractType = null;
      this.isExport = false;
      this.data.FromStock = false;
      this.data.DispositionNumber = "";
      this.data.Commodity = null;
      this.data.CommodityDescription = "";
      this.selectedOrderType = null;
      this.data.Material = null;
      this.data.MaterialConstruction = null;
      this.data.YarnMaterial = null;
      this.data.MaterialWidth = 0;
      this.data.DesignMotive = null;
      this.orderQuantity = 0;
      this.data.UOM = null;
      this.data.ShippingQuantityTolerance = 0;
      this.data.Amount = 0;
      this.data.Quality = null;
      this.data.PieceLength = "";
      this.data.Packing = "";
      this.selectedUseIncomeTax = false;
      this.data.TermOfPayment = null;
      this.selectedAccountBank = null;
      this.data.Agent = null;
      this.data.TransportFee = "";
      this.data.DeliveredTo = "";
      this.data.DeliverySchedule = null;
      this.data.ShipmentDescription = "";
      this.data.Condition = "";
      this.data.Commision = "";
      this.data.PointSystem = 10;
      this.data.PointLimit = 0;
      this.data.Details = [];

    }
  }

  selectedCostCalculationChanged(newValue, oldValue) {
    if (newValue) {
      this.data.CostCalculation = newValue;
      this.data.Buyer = newValue.PreSalesContract.Buyer.Name;
      this.data.Unit = newValue.PreSalesContract.Unit.Name;
      this.data.SalesContractType = newValue.PreSalesContract.Type;
      this.data.Material = newValue.Material.Name;
      this.orderQuantity = newValue.PreSalesContract.OrderQuantity;
      this.data.UOM = newValue.UOM.Unit;
      this.data.ProductionOrderNo = newValue.ProductionOrderNo;
      this.itemsOptions.UnitName = newValue.PreSalesContract.Unit.Name;
      this.itemsOptions.ScreenCost = newValue.ScreenCost;
      this.data.TransportFee = newValue.FreightCost;

      this.isPrinting = this.data.CostCalculation.PreSalesContract.Unit.Name === "PRINTING";

      if (newValue.PreSalesContract.Buyer.Type && (newValue.PreSalesContract.Buyer.Type.toLowerCase() == "ekspor" || newValue.PreSalesContract.Buyer.Type.toLowerCase() == "export")) {
        this.filterpayment = {
          "isExport": true
        };
        this.isExport = true;
      } else {
        this.filterpayment = {
          "isExport": false
        };
        this.isExport = false;
      }
    } else {
      this.data.Buyer = null;
      this.data.Unit = null;
      this.data.SalesContractType = null;
      this.isExport = false;
      this.data.FromStock = false;
      this.data.DispositionNumber = "";
      this.data.Commodity = null;
      this.data.CommodityDescription = "";
      this.selectedOrderType = null;
      this.data.Material = null;
      this.data.MaterialConstruction = null;
      this.data.YarnMaterial = null;
      this.data.MaterialWidth = 0;
      this.data.DesignMotive = null;
      this.orderQuantity = 0;
      this.data.UOM = null;
      this.data.ShippingQuantityTolerance = 0;
      this.data.Amount = 0;
      this.data.Quality = null;
      this.data.PieceLength = "";
      this.data.Packing = "";
      this.selectedUseIncomeTax = false;
      this.data.TermOfPayment = null;
      this.selectedAccountBank = null;
      this.data.Agent = null;
      this.data.TransportFee = "";
      this.data.DeliveredTo = "";
      this.data.DeliverySchedule = null;
      this.data.ShipmentDescription = "";
      this.data.Condition = "";
      this.data.Commision = "";
      this.data.PointSystem = 10;
      this.data.PointLimit = 0;
      this.data.Details = [];

    }
  }

  @bindable selectedBuyer;
  selectedBuyerChanged(newValue, oldValue) {
    this.data.Buyer = newValue;
    if (newValue) {
      if (newValue.Type.toLowerCase() == "ekspor" || newValue.Type.toLowerCase() == "export") {
        this.filterpayment = {
          "isExport": true
        };
        this.isExport = true;
      } else {
        this.filterpayment = {
          "isExport": false
        };
        this.isExport = false;
      }

    } else {
      this.isExport = false;
      this.data.FromStock = false;
      this.data.DispositionNumber = "";
      this.data.Commodity = null;
      this.data.CommodityDescription = "";
      this.selectedOrderType = null;
      this.data.Material = null;
      this.data.MaterialConstruction = null;
      this.data.YarnMaterial = null;
      this.data.MaterialWidth = 0;
      this.data.DesignMotive = null;
      this.orderQuantity = 0;
      this.data.UOM = null;
      this.data.ShippingQuantityTolerance = 0;
      this.data.Amount = 0;
      this.data.Quality = null;
      this.data.PieceLength = "";
      this.data.Packing = "";
      this.selectedUseIncomeTax = false;
      this.data.TermOfPayment = null;
      this.selectedAccountBank = null;
      this.data.Agent = null;
      this.data.TransportFee = "";
      this.data.DeliveredTo = "";
      this.data.DeliverySchedule = null;
      this.data.ShipmentDescription = "";
      this.data.Condition = "";
      this.data.Commision = "";
      this.data.PointSystem = 10;
      this.data.PointLimit = 0;
      this.data.Details = [];
    }
  }

  @bindable selectedUseIncomeTax = false;
  selectedUseIncomeTaxChanged(newValue, oldValue) {
    this.data.UseIncomeTax = newValue

    if (this.data.Details) {

      this.data.Details.map((detail) => {
        detail.isUseIncomeTax = true
      });
      // 
      if (this.context.FPCollection) {

        this.context.FPCollection.bind();
      }
    }

  }

  @bindable isPrinting = false;
  @bindable selectedOrderType;
  selectedOrderTypeChanged(newValue, oldValue) {
    this.data.OrderType = newValue;
    if (newValue) {
      if (newValue.Name.toLowerCase() === "printing") {
        this.isPrinting = true;
      }
    } else {
      this.isPrinting = false;
    }
  }

  @bindable isExistAccountBank = false;
  @bindable selectedAccountBank;
  selectedAccountBankChanged(newValue, oldValue) {
    if (newValue) {
      this.data.AccountBank = this.selectedAccountBank;
      this.isExistAccountBank = true;
      console.log("test");
      if(!this.data.Id || this.data.isCopy){
        this.data.Details = [];
        if (this.dataCC.length > 0) {
          for (var item of this.dataCC) {
            this.data.Details.push({
              Currency: this.data.AccountBank.Currency,
              Color: item.Color,
              Price: 0,
              UseIncomeTax: false,
              ScreenCost: this.dataCC[0].ScreenCost,
              CostCalculationId : item.Id,
              ProductionOrderNo : item.ProductionOrderNo,
              isUseIncomeTax: true
            });
          }
        }
      }
      
    } else {
      this.data.AccountBank = null;
      this.isExistAccountBank = false;
    }
  }

  @bindable selectedPointSystem;
  isFourPointSystem = false;
  selectedPointSystemChanged(newValue, oldValue) {
    this.data.PointSystem = newValue;
    if (newValue) {
      if (newValue == 4) {
        this.isFourPointSystem = true;
      } else {
        this.isFourPointSystem = false;
      }
    } else {
      this.isFourPointSystem = false
    }
  }

  get detailHeader() {
    // if (!this.data.UseIncomeTax) {

    //   if (this.data.CostCalculation && this.data.CostCalculation.PreSalesContract.Unit.Name.toUpperCase() === "PRINTING") {

    //     return [{ header: "Warna" }, { header: "Biaya Screen" }, { header: "Harga" }, { header: "Mata Uang" }];
    //   } else {

    //     return [{ header: "Warna" }, { header: "Harga" }, { header: "Mata Uang" }];
    //   }
    // }
    // else {
    if (this.data.PreSalesContract && this.data.PreSalesContract.Unit.Name.toUpperCase() === "PRINTING") {
      return [{ header: "Warna" }, { header: "Biaya Screen" }, { header: "Harga" }, { header: "Mata Uang" }, { header: "Include PPn?" }];
    } else {
      return [{ header: "Warna" }, { header: "Harga" }, { header: "Mata Uang" }, { header: "Include PPn?" }];
    }

    // }
  }

  itemsInfo = {
    onAdd: function () {
      this.data.Details.push({
        Currency: this.data.AccountBank.Currency,
        Color: '',
        Price: 0,
        UseIncomeTax: false,
        ScreenCost: this.data.CostCalculation.ScreenCost,
        isUseIncomeTax: true
      });
    }.bind(this)
  }

  get buyerLoader() {
    return BuyersLoader;
  }

  buyerView(buyer) {
    return buyer.Name ? `${buyer.Code} - ${buyer.Name}` : '';
  }

  get comodityLoader() {
    return ComodityLoader;
  }

  get orderTypeLoader() {
    return OrderTypeLoader;
  }

  get materialLoader() {
    return MaterialLoader;
  }

  get costCalculationLoader() {
    return CostCalculationLoader;
  }

  get materialConstructionLoader() {
    return MaterialConstructionLoader;
  }

  get yarnMaterialLoader() {
    return YarnMaterialLoader;
  }

  get designMotiveLoader() {
    return DesignMotiveLoader;
  }

  get uomLoader() {
    return UomLoader;
  }

  get qualityLoader() {
    return QualityLoader;
  }

  get termOfPaymentLoader() {
    return TermOfPaymentLoader;
  }

  get accountBankLoader() {
    return AccountBankLoader;
  }

  get preSalesContractLoader() {
    return PreSalesContractLoader;
  }

  bankView(bank) {
    return bank.AccountName ? `${bank.AccountName} - ${bank.BankName} - ${bank.AccountNumber} - ${bank.Currency.Code}` : '';
  }

  costCalculationView(cc) {
    return cc.PreSalesContract.No;
  }

  preSalesContractView(preSC) {
    return preSC.No;
  }

  controlOptions = {
    label: {
      length: 4
    },
    control: {
      length: 7,
      align: "right"
    }
  }

}
