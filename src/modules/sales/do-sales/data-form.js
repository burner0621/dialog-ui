import {
  bindable,
  inject,
  containerless,
  computedFrom,
  BindingEngine,
} from "aurelia-framework";
import { BindingSignaler } from "aurelia-templating-resources";
import { Service, ServiceCore } from "./service";

import SalesContractLoader from "../../../loader/finishing-printing-sales-contract-loader";
import { SPINNING, WEAVING, DYEINGPRINTING } from '../do-sales/shared/permission-constant';
import { PermissionHelper } from '../../../utils/permission-helper';
var StorageLoader = require('../../../loader/storage-loader');
import SalesContractSpinningLoader from "../../../loader/spinning-sales-contract-loader";
import SalesContractWeavingLoader from "../../../loader/weaving-sales-contract-loader";

@containerless()
@inject(Service, ServiceCore, BindingSignaler, BindingEngine, PermissionHelper)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data;
  @bindable error;

  @bindable disp;
  @bindable op;
  @bindable sc;
  @bindable fillEachBale;
  @bindable LengthUom;
  @bindable WeightUom;
  @bindable BaleUom;
  @bindable selectedSalesContract;
  @bindable selectedSalesContractSpinning;
  @bindable selectedSalesContractWeaving;

  constructor(service, serviceCore, bindingSignaler, bindingEngine, permissionHelper) {
    this.service = service;
    this.serviceCore = serviceCore;
    this.signaler = bindingSignaler;
    this.bindingEngine = bindingEngine;

    this.permissions = permissionHelper.getUserPermissions();
    this.initPermission();
  }

  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || "").toString() !== "";
  }
  async bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    if (this.data.Disp) {
      this.disp = this.data.Disp;
    }
    if (this.data.Op) {
      this.op = this.data.Op;
    }
    if (this.data.Sc) {
      this.sc = this.data.Sc;
    }
    if (this.data.FillEachBale) {
      this.fillEachBale = this.data.FillEachBale;
    }

    if (this.data.DOSalesCategory === "SPINNING") {
      this.code = true;
      this.code1 = false;
      this.code2 = false;

    } else if (this.data.DOSalesCategory === "WEAVING") {

      this.code = false;
      this.code1 = true;
      this.code2 = false;
    }
    else {

      this.code = false;
      this.code1 = false;
      this.code2 = true;
    }
    // if (this.data.SalesContract) {
    //   this.selectedSalesContract = this.data.SalesContract;
    // }

    if (this.code == true) {
      var salesContractSpinning = this.data.SalesContract;
      if (salesContractSpinning) {
        this.selectedSalesContractSpinning = await this.service.getSalesContractSpinningById(
          salesContractSpinning.Id
        );
      } else {
        this.selectedSalesContractSpinning = this.data.SalesContractSpinning;
      }
    }

    if (this.code1 == true) {
      var salesContractWeaving = this.data.SalesContract;
      if (salesContractWeaving) {
        this.selectedSalesContractWeaving = await this.service.getSalesContractWeavingById(
          salesContractWeaving.Id
        );
      } else {
        this.selectedSalesContractWeaving = this.data.salesContractWeaving;
      }
    }

    if (this.code2 == true) {
      var salesContract = this.data.SalesContract;
      if (salesContract) {
        this.selectedSalesContract = await this.service.getSalesContractDyeingPrintingById(
          salesContract.Id
        );
      } else {
        this.selectedSalesContract = this.data.SalesContract;
      }
    }


    if (this.data.LengthUom) {
      this.detailOptions.LengthUom = this.data.LengthUom;
      this.LengthUom = this.data.LengthUom;
    }

    if (this.data.WeightUom) {
      this.detailOptions.WeightUom = this.data.WeightUom;
      this.WeightUom = this.data.WeightUom;
    }
  }

  doSalesLocalItemsInfo = {
    columns: ["No SPP", "Material Konstruksi", "Jenis / Code", "Jumlah Packing", "Panjang", "Hasil Konversi", ],
    onAdd: function () {
      this.context.ItemsCollection.bind();
      this.data.DOSalesDetailItems = this.data.DOSalesDetailItems || [];
      this.data.DOSalesDetailItems.push({});
    }.bind(this),
    onRemove: function () {
      this.context.ItemsCollection.bind();
    }.bind(this),
  };

  doSalesLocalSpinningItemsInfo = {
    columns: ["No SOP", "Jenis dan Nomor Benang", "Jumlah Packing", "Panjang", "Hasil Konversi",],
    onAdd: function () {
      this.context.ItemsCollection.bind();
      this.data.DOSalesDetailItems = this.data.DOSalesDetailItems || [];
      this.data.DOSalesDetailItems.push({});
    }.bind(this),
    onRemove: function () {
      this.context.ItemsCollection.bind();
    }.bind(this),
  };

  doSalesLocalWeavingItemsInfo = {
    columns: ["No SOP", "Jenis dan Nomor Benang", "Grade", "Jumlah Packing", "Panjang", "Hasil Konversi",],
    onAdd: function () {
      this.context.ItemsCollection.bind();
      this.data.DOSalesDetailItems = this.data.DOSalesDetailItems || [];
      this.data.DOSalesDetailItems.push({});
    }.bind(this),
    onRemove: function () {
      this.context.ItemsCollection.bind();
    }.bind(this),
  };
  // ==================================================

  doSalesExportItemsInfo = {
    columns: [
      "No SPP",
      "Material Konstruksi",
      "Jenis / Code",
      "Jumlah Packing",
      "Berat",
      "Hasil Konversi",
    ],
    onAdd: function () {
      this.context.ItemsCollection.bind();
      this.data.DOSalesDetailItems = this.data.DOSalesDetailItems || [];
      this.data.DOSalesDetailItems.push({});
    }.bind(this),
    onRemove: function () {
      this.context.ItemsCollection.bind();
    }.bind(this),
  };

  doSalesExportItemsSpinningInfo = {
    columns: ["No SOP", "Jenis dan Nomor Benang", "Jumlah Packing", "Panjang", "Hasil Konversi",],
    onAdd: function () {
      this.context.ItemsCollection.bind();
      this.data.DOSalesDetailItems = this.data.DOSalesDetailItems || [];
      this.data.DOSalesDetailItems.push({});
    }.bind(this),
    onRemove: function () {
      this.context.ItemsCollection.bind();
    }.bind(this),
  };

  doSalesExportItemsWeavingInfo = {
    columns: ["No SOP", "Jenis dan Nomor Benang", "Grade", "Jumlah Packing", "Panjang", "Hasil Konversi",],
    onAdd: function () {
      this.context.ItemsCollection.bind();
      this.data.DOSalesDetailItems = this.data.DOSalesDetailItems || [];
      this.data.DOSalesDetailItems.push({});
    }.bind(this),
    onRemove: function () {
      this.context.ItemsCollection.bind();
    }.bind(this),
  };

  detailOptions = {};

  doSalesTypeOptions = ["", "Lokal", "Ekspor"];
  doSalesLocalOptions = ["", "US", "UP", "UK", "RK", "USS", "UPS", "JS", "JB"];
  doSalesExportOptions = ["", "KKF", "KKP"];

  packingUomOptions = ["", "DOS"];
  packingUomWeavingOptions = ["", "PCS", "BALE"];
  packingUomDyeingOptions = ["", "PCS", "ROLL", "PT"];
  baleUomDyeingOptions = ["", "PCS", "ROLL", "YDS", "MTR"];
  lengthUomOptions = ["", "YDS", "MTR"];
  weightUomOptions = ["", "BALE", "KG"];

  async selectedSalesContractSpinningChanged(newValue, oldValue) {
    
    if (newValue) {
      this.data.SalesContractSpinning = {};
      this.data.SalesContractSpinning = this.selectedSalesContractSpinning;

      // this.data.Material = this.selectedSalesContractSpinning.Material;
      // this.data.MaterialConstruction = this.selectedSalesContractSpinning.MaterialConstruction;
      // this.data.MaterialWidth = this.selectedSalesContractSpinning.MaterialWidth;

      if (this.selectedSalesContractSpinning.Buyer.Id) {
        this.selectedBuyer = await this.serviceCore.getBuyerById(
          this.selectedSalesContractSpinning.Buyer.Id
        );
        this.data.Buyer = this.selectedBuyer;
      } else {
        this.selectedBuyer = this.selectedSalesContractSpinning.Buyer;
        this.data.Buyer = this.selectedSalesContractSpinning.Buyer;
      }

      if (!this.data.Id) {
        var salesSpinningContract = await this.service.getById(
          this.data.SalesContract.Id
        );

        var scData = salesSpinningContract.data;
        this.data.DOSalesDetailItems = [];
        for (var item of scData) {
          for (var detailItem of item.Details) {
            var sc = {
              // Material: item.Material,
              // MaterialConstruction: item.MaterialConstruction,
              // MaterialWidth: item.MaterialWidth,
              // ColorRequest: detailItem.ColorRequest,
              // ColorTemplate: detailItem.ColorTemplate,
              // ProductionOrder: item,
              // ConstructionName: `${item.Material.Name} / ${item.MaterialConstruction.Name} / ${item.MaterialWidth} / ${detailItem.ColorRequest}`,
            };
            this.data.DOSalesDetailItems.push(sc);
          }
        }
      }
    } else {
      this.data.salesSpinningContract = null;
      this.data.Buyer = null;
      this.data.DOSalesDetailItems = [];
    }
  }

  async selectedSalesContractWeavingChanged(newValue, oldValue) {
    
    if (newValue) {
      this.data.SalesContractWeaving = {};
      this.data.SalesContractWeaving = this.selectedSalesContractWeaving;

      // this.data.Material = this.selectedSalesContractSpinning.Material;
      // this.data.MaterialConstruction = this.selectedSalesContractSpinning.MaterialConstruction;
      // this.data.MaterialWidth = this.selectedSalesContractSpinning.MaterialWidth;

      if (this.selectedSalesContractWeaving.Buyer.Id) {
        this.selectedBuyer = await this.serviceCore.getBuyerById(
          this.selectedSalesContractWeaving.Buyer.Id
        );
        this.data.Buyer = this.selectedBuyer;
        
      } else {
        this.selectedBuyer = this.selectedSalesContractWeaving.Buyer;
        this.data.Buyer = this.selectedSalesContractWeaving.Buyer;
      }

      if (!this.data.Id) {
        var salesWeavingContract = await this.service.getById(
          this.data.SalesContract.Id
        );

        var scData = salesWeavingContract.data;
        this.data.DOSalesDetailItems = [];
        for (var item of scData) {
          for (var detailItem of item.Details) {
            var sc = {
              // Material: item.Material,
              // MaterialConstruction: item.MaterialConstruction,
              // MaterialWidth: item.MaterialWidth,
              // ColorRequest: detailItem.ColorRequest,
              // ColorTemplate: detailItem.ColorTemplate,
              // ProductionOrder: item,
              // ConstructionName: `${item.Material.Name} / ${item.MaterialConstruction.Name} / ${item.MaterialWidth} / ${detailItem.ColorRequest}`,
            };
            this.data.DOSalesDetailItems.push(sc);
          }
        }
      }
    } else {
      this.data.salesSpinningContract = null;
      this.data.Buyer = null;
      this.data.DOSalesDetailItems = [];
    }
  }

  async selectedSalesContractChanged(newValue, oldValue) {
    // if (this.selectedSalesContract && this.selectedSalesContract.Id) {
    if (newValue) {
      this.data.SalesContract = {};
      this.data.SalesContract = this.selectedSalesContract;
      this.data.Material = this.selectedSalesContract.Material;
      this.data.MaterialConstruction = this.selectedSalesContract.MaterialConstruction;
      this.data.MaterialWidth = this.selectedSalesContract.MaterialWidth;

      if (this.selectedSalesContract.Buyer.Id) {
        this.selectedBuyer = await this.serviceCore.getBuyerById(
          this.selectedSalesContract.Buyer.Id
        );
        this.data.Buyer = this.selectedBuyer;
      } else {
        this.selectedBuyer = this.selectedSalesContract.Buyer;
        this.data.Buyer = this.selectedSalesContract.Buyer;
      }

      if (!this.data.Id) {
        var salesContract = await this.service.getProductionOrderBySalesContractId(
          this.data.SalesContract.Id
        );
        var scData = salesContract.data;
        this.data.DOSalesDetailItems = [];
        for (var item of scData) {
          for (var detailItem of item.Details) {
            var sc = {
              Material: item.Material,
              MaterialConstruction: item.MaterialConstruction,
              MaterialWidth: item.MaterialWidth,
              ColorRequest: detailItem.ColorRequest,
              ColorTemplate: detailItem.ColorTemplate,
              ProductionOrder: item,
              ConstructionName: `${item.Material.Name} / ${item.MaterialConstruction.Name} / ${item.MaterialWidth} / ${detailItem.ColorRequest}`,
            };
            this.data.DOSalesDetailItems.push(sc);
          }
        }
      }
    } else {
      this.data.SalesContract = null;
      this.data.Buyer = null;
      this.data.DOSalesDetailItems = [];
    }
  }

  dispChanged(newValue, OldValue) {
    this.data.Disp = this.disp;
  }
  opChanged(newValue, OldValue) {
    this.data.Op = this.op;
  }
  scChanged(newValue, OldValue) {
    this.data.Sc = this.sc;
  }
  fillEachBaleChanged(newValue, OldValue) {
    this.data.FillEachBale = this.fillEachBale;
  }

  LengthUomChanged(newValue, oldValue) {
    if (this.LengthUom && this.data.SalesContract) {
      this.detailOptions.LengthUom = {};
      this.detailOptions.LengthUom = this.LengthUom;
    }
    this.data.LengthUom = {};
    this.data.LengthUom = this.LengthUom;
  }

  WeightUomChanged(newValue, oldValue) {
    if (this.WeightUom && this.data.SalesContract) {
      this.detailOptions.WeightUom = {};
      this.detailOptions.WeightUom = this.WeightUom;
    }
    this.data.WeightUom = {};
    this.data.WeightUom = this.WeightUom;
  }

  enterDelegate(event) {
    if (event.charCode === 13) {
      event.preventDefault();
      return false;
    } else return true;
  }

  salesContractNoView(sc) {
    return sc.SalesContractNo;
  }

  get salesContractLoader() {
    return SalesContractLoader;
  }

  get SalesContractSpinningLoader() {
    return SalesContractSpinningLoader;
  }

  get SalesContractWeavingLoader() {
    return SalesContractWeavingLoader;
  }

  initPermission() {
    this.roles = [SPINNING, WEAVING, DYEINGPRINTING];
    this.accessCount = 0;

    for (let i = this.roles.length - 1; i >= 0; i--) {
      if (this.permissions.hasOwnProperty(this.roles[i].code)) {
        this.roles[i].hasPermission = true;
        this.accessCount++;
        this.activeRole = this.roles[i];


      }
    }

  }

  storageView = (storage) => {

    return `${storage.unit.name} - ${storage.name}`

  }

  get storageLoader() {

    return StorageLoader;

  }
}
