import { inject, bindable, computedFrom } from "aurelia-framework";
import { Service } from "./service";
import moment from "moment";
let AvalAreaLoader = require("../../../loader/output-aval-loader");
let DOAvalLoader = require("../../../loader/do-aval-loader");
@inject(Service)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data;
  @bindable error;
  @bindable isPenjualan;
  @bindable DyeingPrintingItems;

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    // deleteText: "Hapus",
    // editText: "Ubah"
  };
  adjItemColumns = ["Nama Barang", "Saldo Satuan", "Saldo Berat", "Qty Keluar Satuan", "Qty Keluar Berat", "No Dokumen"];
  types = ["OUT", "ADJ"];
  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

  itemOptions = {};
  detailOptions = {};
  penjualanFilter = {
    DestinationArea: "PENJUALAN"
  }
  constructor(service) {
    this.service = service;
  }

  get doAvalLoader() {
    return DOAvalLoader;
  }

  doAvalTextFormatter = (doAval) => {
    return `${doAval.DOAvalNo}`
  }

  DOFormatter = (DoItem) => {
    return `${DoItem.DeliveryOrderSalesNO}`
  }
  avalBonTextFormatter = (bonAval) => {
    return `${bonAval.bonNo}`
  }

  @computedFrom("data.type")
  get isAdj() {
    return this.data && this.data.type == "ADJ";
  }

  @computedFrom("data.id")
  get isEdit() {
    return (this.data.id || "").toString() != "";
  }

  @bindable AvalItems;
  bind(context) {
    this.context = context;
    this.service = this.context.service;
    this.data = this.context.data;
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
    this.isPenjualan = true;
    this.isHasData = false;

    this.itemOptions = {
      isEdit: this.isEdit
    };
    this.detailOptions = {
      isEdit: this.isEdit
    };

    if (this.data.deliveryOrderAvalId && this.data.deliveryOrderAvalNo) {
      this.selectedDOAval = {};
      this.selectedDOAval.Id = this.data.deliveryOrderAvalId;
      this.selectedDOAval.DOAvalNo = this.data.deliveryOrderAvalNo;
    }

    if (this.readOnly) {
      this.dyeingPrintingBuyerItemsColumns = [
        {
          value: "avalType",
          header: "Nama Barang",
        },
        {
          value: "avalQuantity",
          header: "Qty Keluar Satuan",
        },
        {
          value: "avalQuantityKg",
          header: "Qty Keluar Berat",
        },
        {
          value: "noSj",
          header: "NO. SJ",
        }
      ];

      this.dyeingPrintingItemsColumns = [
        {
          value: "avalType",
          header: "Nama Barang",
        },
        {
          value: "avalQuantity",
          header: "Qty Keluar Satuan",
        },
        {
          value: "avalQuantityKg",
          header: "Qty Keluar Berat",
        },
      ];

      this.adjItemColumns = ["Nama Barang", "Qty Keluar Satuan", "Qty Keluar Berat", "No Dokumen"];
    } else {
      this.dyeingPrintingBuyerItemsColumns = [
        {
          value: "avalType",
          header: "Nama Barang",
        },
        {
          value: "avalQuantity",
          header: "Qty Keluar Satuan",
        },
        {
          value: "avalQuantityKg",
          header: "Qty Keluar Berat",
        },
        {
          value: "noSj",
          header: "NO. SJ",
        },
        {
          value: "",
          header: "",
        }
      ];
      this.dyeingPrintingItemsColumns = [
        {
          value: "avalType",
          header: "Nama Barang",
        },
        {
          value: "avalUomUnit",
          header: "Saldo Satuan",
        },
        {
          value: "avalUomUnit",
          header: "Saldo Berat",
        },
        {
          value: "avalQuantity",
          header: "Qty Keluar Satuan",
        },
        {
          value: "avalQuantityKg",
          header: "Qty Keluar Berat",
        },
      ];
      this.adjItemColumns = ["Nama Barang", "Saldo Satuan", "Saldo Berat", "Qty Keluar Satuan", "Qty Keluar Berat", "No Dokumen"];
    }

    this.data.Area = "GUDANG AVAL";
    if (this.data.id) {
      this.data.Date = this.data.date;
      this.data.Shift = this.data.shift;
      this.data.Group = this.data.group;
      // this.data.DestinationArea = this.data.destinationArea;
      this.selectedZona = this.data.destinationArea;
      if (this.data.DestinationArea != "PENJUALAN") {
        var selectedBon = {};
        selectedBon.bonNo = this.data.bonNo;
        selectedBon.id = this.data.id;
        selectedBon.avalItems = this.data.avalItems;
        this.selectedAvalBon = selectedBon;
      }
      this.data.doNO = this.data.deliveryOrderSalesNo;


      if (this.data.type == "OUT") {
        if (this.data.avalItems.length > 0) {
          this.data.DyeingPrintingItems = this.data.avalItems;
          this.selectedAvalBon.avalItems = this.data.avalItems;
          // this.data.DyeingPrintingItemsBuyer = this.data.avalItems;
          this.isHasData = true;
        }
      } else {
        if (this.data.avalItems) {
          this.data.adjAvalItems = this.data.avalItems;
        }

      }
    }
  }

  shifts = ["PAGI", "SIANG"];

  // destinationAreas = ["SHIPPING"];
  destinationAreas = ["PENJUALAN", "BUYER"];

  groups = ["A", "B"];
  addItemCallback = (e) => {
    this.data.adjAvalItems =
      this.data.adjAvalItems || [];
    this.data.adjAvalItems.push({});
  };

  ExportToExcel() {
    this.service.generateExcelReportById(this.data.id);
  }

  Date = null;
  Shift = null;
  Group = null;

  searching() {
    var errorIndex = 0;

    this.data.AvalJointValue = 0;
    this.data.AvalAValue = 0;
    this.data.AvalBValue = 0;
    this.data.AvalInducementValue = 0;
    this.data.AvalDirtyRopeValue = 0;
    this.data.AvalDirtyClothValue = 0;

    if (
      this.data.Date == undefined ||
      this.data.Date == null ||
      this.data.Date == "" ||
      isNaN(this.data.Date)
    ) {
      this.error.Date = "Tanggal Harus Diisi";
      errorIndex++;
    } else {
      this.Date = this.data.Date
        ? moment(this.data.Date).format("DD MMM YYYY HH:mm")
        : null;
      this.error.Date = "";
    }



    if (errorIndex == 0) {
      this.data.DyeingPrintingMovementIds = [];

      this.service.getAvailableAval(this.Date, this.Shift, this.Group).then((result) => {
        if (result.length > 0) {

          result.forEach((datum) => {
            var DyeingPrintingMovementIds = {};
            DyeingPrintingMovementIds.DyeingPrintingMovementId =
              datum.avalInputId;
            DyeingPrintingMovementIds.AvalItemId = datum.avalItemId;

            this.data.DyeingPrintingMovementIds.push(DyeingPrintingMovementIds);
            this.isHasData = true;
          });

          this.data.DyeingPrintingItems = result;
          this.data.DyeingPrintingItemsBuyer = result;
        } else {
          this.isHasData = false;
        }
      });
    } else {
      this.error.Date;
      this.error.Shift;
    }
  }

  // DOLoader = (e) => {
  //   var listDo = [
  //     {
  //       "DeliveryOrderSalesID": 52,
  //       "DeliveryOrderSalesNO": "20US000017"
  //     }
  //   ]
  //   return Promise.resolve(true).then(result => {
  //     return listDo;
  //   });
  // }

  reset() {
    this.data.Date = undefined;

    this.Date = null;
    this.Shift = null;

    this.isHasData = false;

    this.error.Date = "";
    this.error.Shift = "";
  }

  dyeingPrintingItemsColumns = [
    {
      value: "avalType",
      header: "Nama Barang",
    },
    {
      value: "avalUomUnit",
      header: "Saldo Satuan",
    },
    {
      value: "avalUomUnit",
      header: "Saldo Berat",
    },
    {
      value: "avalQuantity",
      header: "Qty Keluar Satuan",
    },
    {
      value: "avalQuantityKg",
      header: "Qty Keluar Berat",
    },
  ];
  dyeingPrintingBuyerItemsColumns = [
    {
      value: "avalType",
      header: "Nama Barang",
    },
    {
      value: "avalQuantity",
      header: "Qty Keluar Satuan",
    },
    {
      value: "avalQuantityKg",
      header: "Qty Keluar Berat",
    },
    {
      value: "noSj",
      header: "NO. SJ",
    },
    {
      value: "",
      header: "",
    }
  ];

  addItems = (e) => {
    this.data.DyeingPrintingItems = this.data.DyeingPrintingItems || [];
    this.data.DyeingPrintingItems.push({});
  };

  // addItemsBuyer = (e) => {
  //   this.data.DyeingPrintingItemsBuyer = this.data.DyeingPrintingItemsBuyer || [];
  //   this.data.DyeingPrintingItemsBuyer.push({});
  // };

  get avalAreaLoader() {
    return AvalAreaLoader;
  }

  @bindable selectedAvalBon
  selectedAvalBonChanged(n, o) {
    if (this.data.id == 0 || this.data.id == undefined || this.data.id == null) {
      this.service.getById(n.id).then((selectedBon) => {
        // this.data.doNO = selectedBon.deliveryOrderSalesNo;
        if (selectedBon.deliveryOrderAvalId && selectedBon.deliveryOrderAvalNo) {
          
          this.data.deliveryOrderAvalId = selectedBon.deliveryOrderAvalId;
          this.data.deliveryOrderAvalNo = selectedBon.deliveryOrderAvalNo;
          this.selectedDOAval = {};
          this.selectedDOAval.Id = this.data.deliveryOrderAvalId;
          this.selectedDOAval.DOAvalNo = this.data.deliveryOrderAvalNo;
        }
        this.data.DyeingPrintingItems = selectedBon.avalItems.filter(s => !s.hasNextAreaDocument);
      });

    }
  }

  removeDetails() {
    this.bind();
  }

  @bindable selectedZona
  selectedZonaChanged(n, o) {
    if (n == "PENJUALAN") {
      this.isPenjualan = true;
    }
    else {
      this.isPenjualan = false;
    }
    this.data.DestinationArea = n;

    if (n != o && !this.data.id) {
      this.data.DyeingPrintingItems.splice(0, this.data.DyeingPrintingItems.length);
      this.selectedAvalBon = null;
      this.data.doNO = null;
      this.data.deliveryOrderAvalId = 0;
      this.data.deliveryOrderAvalNo = null;
      this.selectedDOAval = null;

    }
    // if( n!=o){
    // this.data.DyeingPrintingItems = [];
    // this.data.DyeingPrintingItemsBuyer = null;
    // this.data.doNO = null;
    // }
  }

  @bindable selectedDOAval;
  selectedDOAvalChanged(n, o) {
    if (this.selectedDOAval) {
      this.data.deliveryOrderAvalId = this.selectedDOAval.Id;
      this.data.deliveryOrderAvalNo = this.selectedDOAval.DOAvalNo;

    } else {
      this.data.deliveryOrderAvalId = 0;
      this.data.deliveryOrderAvalNo = null;
    }
  }
}
