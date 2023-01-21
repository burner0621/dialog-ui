import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service, ServiceCore } from "./service";
import { activationStrategy } from "aurelia-router";
import { SPINNING, WEAVING, DYEINGPRINTING } from '../do-sales/shared/permission-constant';
import { PermissionHelper } from '../../../utils/permission-helper';
var StorageLoader = require('../../../loader/storage-loader');


import {
  bindable,
  containerless,
  computedFrom,
  BindingEngine,
} from "aurelia-framework";
import { BindingSignaler } from "aurelia-templating-resources";

import SalesContractLoader from "../../../loader/finishing-printing-sales-contract-loader";
import SalesContractSpinningLoader from "../../../loader/spinning-sales-contract-loader";
import SalesContractWeavingLoader from "../../../loader/weaving-sales-contract-loader";

@containerless()
@inject(Router, Service, PermissionHelper, ServiceCore)
export class Create {
  @bindable title;
  @bindable readOnly;
  @bindable data;
  @bindable error;

  @bindable disp;
  @bindable op;
  @bindable sc;
  @bindable fillEachBale;
  @bindable LengthUom;
  @bindable BaleUom;
  @bindable WeightUom;
  @bindable selectedSalesContract;

  constructor(router, service, permissionHelper, serviceCore, bindingSignaler, bindingEngine) {
    this.router = router;
    this.service = service;
    this.data = {};
    this.error = {};

    this.permissions = permissionHelper.getUserPermissions();
    this.initPermission();

    this.serviceCore = serviceCore;
    this.signaler = bindingSignaler;
    this.bindingEngine = bindingEngine;

  }

  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || "").toString() !== "";
  }

  activate(params) {
    this.activeRole = {};
    this.activeRole.key = params.activeRole;
    this.changeTable(this.activeRole);
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

    // if (this.data.SalesContract) {
    //   this.selectedSalesContract = this.data.SalesContract;
    // }

    var salesContract = this.data.SalesContract;
    if (salesContract) {
      this.selectedSalesContract = await this.service.getSalesContractById(
        salesContract.Id
      );
    } else {
      this.selectedSalesContract = this.data.SalesContract;
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
    columns: ["No SPP", "Material Konstruksi", "Jenis / Code", "Jumlah Packing", "Panjang", "Hasil Konversi",],
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
    columns: ["No SOP", "Jenis dan Nomor Benang", "Jumlah Packing", "Berat", "Hasil Konversi",],
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
    columns: ["No SPP", "Jenis dan Nomor Benang", "Jenis / Code", "Jumlah Packing", "Panjang", "Hasil Konversi",],
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
    columns: ["No SOP", "Jenis dan Nomor Benang", "Jumlah Packing", "Berat", "Hasil Konversi",],
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
    columns: ["No SOP", "Jenis dan Nomor Benang", "Grade", "Jumlah Packing", "Berat", "Hasil Konversi",],
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
  doSalesDyeingTypeOptions = ["", "Lokal", "Ekspor"];
  doSalesTypeOptions = ["", "Lokal", "Ekspor"];
  doSalesLocalOptions = ["", "US", "UP", "UK", "RK", "USS", "UPS", "JS", "JB"];
  //doSalesExportOptions = ["", "KKF", "KKP"];
  packingUomOptions = ["", "DOOS", "Karung"];
  packingUomWeavingOptions = ["", "PCS", "BALE"];
  packingUomDyeingOptions = ["", "PCS", "Roll", "PT"];
  packingUomDyeingExportOptions = ["", "PCS", "Roll", "PT","Carton"];
  baleUomDyeingOptions = ["", "PCS", "ROLL", "YDS", "MTR"];
  lengthUomOptions = ["", "YDS", "MTR"];
  weightUomOptions = ["", "BALE", "KG"];

  doSalesSpinningLocalOptions = ["", "BL", "CN"];
  doSalesSpinningExportOptions = ["", "BE"];

  doSalesWeavingLocalOptions = ["", "GL"];
  doSalesWeavingExportOptions = ["", "KKG"];

  doSalesDyeingLocalOptions = ["", "US", "UP", "UK", "RK", "USS", "UKS", "UPS", "JS", "JB", "SP", "SD"];

  doSalesDyeingExportOptions = ["", "KKP", "KKF"]

  async selectedSalesContractChanged(newValue, oldValue) {
    // if (this.selectedSalesContract && this.selectedSalesContract.Id) {
    if (newValue) {
      this.data.SalesContract = {};
      this.data.SalesContract = this.selectedSalesContract;
      this.data.Material = this.selectedSalesContract.Material;
      this.data.MaterialConstruction = this.selectedSalesContract.MaterialConstruction;
      this.data.MaterialWidth = this.selectedSalesContract.MaterialWidth;

      this.detailOptions.SalesContractNo = this.selectedSalesContract.SalesContractNo;

      if (this.selectedSalesContract.Buyer.Id) {
        this.selectedBuyer = await this.serviceCore.getBuyerById(
          this.selectedSalesContract.Buyer.Id
        );
        this.data.Buyer = this.selectedBuyer;
      } else {
        this.selectedBuyer = this.selectedSalesContract.Buyer;
        this.data.Buyer = this.selectedSalesContract.Buyer;
      }

      // if (!this.data.Id) {
      //   var salesContract = await this.service.getProductionOrderBySalesContractId(
      //     this.data.SalesContract.Id
      //   );
      //   var scData = salesContract.data;
      //   this.data.DOSalesDetailItems = [];
      //   for (var item of scData) {
      //     for (var detailItem of item.Details) {
      //       var sc = {
      //         Material: item.Material,
      //         MaterialConstruction: item.MaterialConstruction,
      //         MaterialWidth: item.MaterialWidth,
      //         ColorRequest: detailItem.ColorRequest,
      //         ColorTemplate: detailItem.ColorTemplate,
      //         ProductionOrder: item,
      //         ConstructionName: `${item.Material.Name} / ${item.MaterialConstruction.Name} / ${item.MaterialWidth} / ${detailItem.ColorRequest}`,
      //       };
      //       this.data.DOSalesDetailItems.push(sc);
      //     }
      //   }
      // }
    } else {
      this.data.SalesContract = null;
      this.data.Buyer = null;
      this.data.DOSalesDetailItems = [];
    }
  }

  get addItems() {
    return (event) => {
      this.data.DOSalesDetailItems.push({})
    };
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

  changeRole(role) {

    if (role.key !== this.activeRole.key) {
      this.activeRole = role;

    }
  }

  changeTable(role) {
    if (role.key === "SPINNING") {

      this.code = true;
      this.code1 = false;
      this.code2 = false;
      this.data.DOSalesCategory = "SPINNING";

    } else if (role.key === "WEAVING") {

      this.code = false;
      this.code1 = true;
      this.code2 = false;
      this.data.DOSalesCategory = "WEAVING";
    } else {

      this.code = false;
      this.code1 = false;
      this.code2 = true;
      this.data.DOSalesCategory = "DYEINGPRINTING";
    }
  }

  back() {
    this.router.navigateToRoute("list");
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  save(event) {
    // console.log(this.data);
    this.service
      .create(this.data)
      .then((result) => {
        alert("Data berhasil dibuat");
        this.router.navigateToRoute(
          "create",
          {},
          { replace: true, trigger: true }
        );
        // this.__goToList();
      })
      .catch((error) => {
        this.error = error;
      });
  }

  storageView = (storage) => {

    return `${storage.unit.name} - ${storage.name}`
  }

  get storageLoader() {

    return StorageLoader;

  }
}
