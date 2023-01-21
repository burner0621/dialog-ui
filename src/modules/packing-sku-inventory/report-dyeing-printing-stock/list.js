import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';
import { Dialog } from '../../../components/dialog/dialog';
import { PackingListForm } from './packing-list-form';
var ProductionOrderLoader = require('../../../loader/production-order-azure-loader');
var BuyerLoader = require('../../../loader/buyers-loader');
var ConstructionLoader = require('../../../loader/production-order-construction-loader');

@inject(Dialog, Router, Service)
export class List {
    @bindable dateFrom;
    @bindable dateTo;
    @bindable error = {};
    @bindable dateReport;
    @bindable zona;
    @bindable selectedBuyer;
    @bindable unit;
    @bindable packingType;
    @bindable inventoryType;
    @bindable selectedConstruction;
    @bindable selectedProductionOrder;
    listDataFlag = false;

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false,
        sortable: false
    }

    inventoryTypes = ["","LAMA","BARU"];
    units = ["", "DYEING", "PRINTING"];
    packingTypes = ["", "WHITE", "DYEING", "BATIK", "TEXTILE", "DIGITAL PRINT", "TRANFER PRINT"];
    zoneList = ["INSPECTION MATERIAL", "TRANSIT", "PACKING", "GUDANG JADI", "GUDANG AVAL", "SHIPPING", "STOCK OPNAME"];
    columns = [
        // {
        //     field: "date", title: "Tanggal", formatter: function (value, data, index) {
        //         return moment(value).format("DD MMM YYYY");
        //     }
        // },
        { field: "noSpp", title: "No. SPP" },
        { field: "construction", title: "Material" },
        { field: "productTextileCode", title: "Kode Barang" },
        { field: "productTextileName", title: "Nama Barang" },
        { field: "unit", title: "Unit" },
        { field: "motif", title: "Motif" },
        { field: "buyer", title: "Buyer" },
        { field: "color", title: "Warna" },
        { field: "grade", title: "Grade" },
        { field: "jenis", title: "Jenis" },
        { field: "ket", title: "Ket" },
        {
            field: "awal", title: "Awal", formatter: function (value, data, index) {
                return numeral(value).format('0.00');
            }, align: "right", halign: "center"
        },
        {
            field: "masuk", title: "Masuk", formatter: function (value, data, index) {
                return numeral(value).format('0.00');
            }, align: "right", halign: "center"
        },
        {
            field: "keluar", title: "Keluar", formatter: function (value, data, index) {
                return numeral(value).format('0.00');
            }, align: "right", halign: "center"
        },
        {
            field: "akhir", title: "Akhir", formatter: function (value, data, index) {
                return numeral(value).format('0.00');
            }, align: "right", halign: "center"
        },
        { field: "satuan", title: "Satuan" }
        //{ field: "inventoryType", title: "Gudang"}
    ];

    columns2 = [
        // {
        //     field: "date", title: "Tanggal", formatter: function (value, data, index) {
        //         return moment(value).format("DD MMM YYYY");
        //     }
        // },
        { field: "noSpp", title: "No. SPP" },
        { field: "construction", title: "Material" },
        { field: "productTextileCode", title: "Kode Barang" },
        { field: "productTextileName", title: "Nama Barang" },
        { field: "unit", title: "Unit" },
        { field: "motif", title: "Motif" },
        { field: "color", title: "Warna" },
        { field: "grade", title: "Grade" },
        { field: "jenis", title: "Jenis" },
        { field: "ket", title: "Ket" },
        {
            field: "awal", title: "Awal", formatter: function (value, data, index) {
                return numeral(value).format('0.00');
            }, align: "right", halign: "center"
        },
        {
            field: "masuk", title: "Masuk", formatter: function (value, data, index) {
                return numeral(value).format('0.00');
            }, align: "right", halign: "center"
        },
        {
            field: "keluar", title: "Keluar", formatter: function (value, data, index) {
                return numeral(value).format('0.00');
            }, align: "right", halign: "center"
        },
        {
            field: "akhir", title: "Akhir", formatter: function (value, data, index) {
                return numeral(value).format('0.00');
            }, align: "right", halign: "center"
        },
        { field: "satuan", title: "Satuan" },
        { field: "inventoryType", title: "Gudang"}
    ];

    columns3 = [
        // {
        //     field: "date", title: "Tanggal", formatter: function (value, data, index) {
        //         return moment(value).format("DD MMM YYYY");
        //     }
        // },
        { field: "noSpp", title: "No. SPP" },
        { field: "construction", title: "Material" },
        { field: "productTextileCode", title: "Kode Barang" },
        { field: "productTextileName", title: "Nama Barang" },
        { field: "unit", title: "Unit" },
        { field: "motif", title: "Motif" },
        { field: "buyer", title: "Buyer" },
        { field: "color", title: "Warna" },
        { field: "grade", title: "Grade" },
        { field: "jenis", title: "Jenis" },
        {
            field: "stockOpname", title: "Stock Opname", formatter: function (value, data, index) {
                return numeral(value).format('0.00');
            }, align: "right", halign: "center"
        },
        {
            field: "storageBalance", title: "Saldo Gudang", formatter: function (value, data, index) {
                return numeral(value).format('0.00');
            }, align: "right", halign: "center"
        },
        {
            field: "difference", title: "Selisih", formatter: function (value, data, index) {
                return numeral(value).format('0.00');
            }, align: "right", halign: "center"
        }
    ];

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    get buyerLoader() {
        return BuyerLoader;
    }

    get constructionLoader() {
        return ConstructionLoader;
    }


    construction = null;
    buyer = null;
    productionOrder = null;
    selectedConstructionChanged(n, o) {
        if (n) {
            this.construction = n;
        } else {
            this.construction = null;
        }
    }

    selectedBuyerChanged(n, o) {
        if (n) {
            this.buyer = n;
        } else {
            this.buyer = null;
        }
    }

    selectedProductionOrderChanged(n, o) {
        if (n) {
            this.productionOrder = n;
        } else {
            this.productionOrder = null;
        }
    }

    loader = (info) => {
        // var order = {};
        // if (info.sort)
        //     order[info.sort] = info.order;
        var arg = {
            // dateFrom: moment(this.dateFrom).format("YYYY-MM-DD"),
            // dateTo: moment(this.dateTo).format("YYYY-MM-DD"),
            dateReport: moment(this.dateReport).format("YYYY-MM-DD"),
            zona: this.zona,
            unit: this.unit,       
            packingType: this.packingType,
            construction: this.construction ? this.construction.Code : null,
            buyer: this.buyer ? this.buyer.Name : null,
            productionOrderId: this.productionOrder ? this.productionOrder.Id : null,
            inventoryType : this.inventoryType,
        }

        return this.listDataFlag ? this.service.search(arg)
            .then((result) => {
                var data = {};
                data.data = result;
                data.total = result.length;

                return data;
            }) : { data: [] };;
    }

    constructor(dialog, router, service) {
        this.dialog = dialog;
        this.service = service;
        this.router = router;
        this.sumStockOpname = 0;
        this.sumStorageBalance = 0;
        this.sumDifference = 0;
        this.isEmpty = true;
        this.data = [];
    }

    zonaChanged(n, o) {
        if (this.zona) {
            this.listDataFlag = false;
        }
    }

    export() {
        // if (this.dateFrom && this.dateTo) {
        if (this.dateReport) {
            this.error = {};
            var arg = {
                // dateFrom: moment(this.dateFrom).format("YYYY-MM-DD"),
                // dateTo: moment(this.dateTo).format("YYYY-MM-DD"),
                dateReport: moment(this.dateReport).format("YYYY-MM-DD"),
                zona: this.zona,
                unit: this.unit,
                packingType: this.packingType,
                construction: this.construction ? this.construction.Code : null,
                buyer: this.buyer ? this.buyer.Name : null,
                productionOrderId: this.productionOrder ? this.productionOrder.Id : null,
                inventoryType : this.inventoryType,
            }
            this.service.generateExcel(arg);
        } else {
            // if (!this.dateFrom) {
            //     this.error.dateFrom = "Tanggal Harus Diisi";
            // }
            // if (!this.dateTo) {
            //     this.error.dateTo = "Tanggal Harus Diisi";
            // }
            this.error.dateReport = "Tanggal Harus Diisi";
        }

    }

    async search() {
        if (this.dateReport && !this.isStockOpname) {
            this.listDataFlag = true;
            this.error = {};
            this.table.refresh();
        } else if (this.dateReport && this.isStockOpname) {
            this.listDataFlag = true;
            this.error = {};
            var arg = {
              dateReport: moment(this.dateReport).format("YYYY-MM-DD"),
              zona: this.zona,
              unit: this.unit,       
              packingType: this.packingType,
              construction: this.construction ? this.construction.Code : null,
              buyer: this.buyer ? this.buyer.Name : null,
              productionOrderId: this.productionOrder ? this.productionOrder.Id : null,
              inventoryType : this.inventoryType,
          }
  
          this.data = await this.service.search(arg)
              .then((result) => {
                  var data = [];
                  if (result.length == 0) this.isEmpty = true;
                  else this.isEmpty = false;

                  this.sumStockOpname = 0;
                  this.sumStorageBalance = 0;
                  this.sumDifference = 0;

                  for (var item of result) {
                    this.sumStockOpname += item.stockOpname;
                    this.sumStorageBalance += item.storageBalance;
                    this.sumDifference += item.difference;
                    var newData = {
                      NoSpp: item.noSpp,
                      Material: item.construction,
                      ProductTextileName : item.ProductTextileName,
                      Unit: item.unit,
                      Motif: item.motif,
                      Buyer: item.buyer,
                      Warna: item.color,
                      Grade: item.grade,
                      Jenis: item.jenis,
                      StockOpname: item.stockOpname ? numeral(item.stockOpname).format("0.00") : 0,
                      StorageBalance: item.storageBalance ? numeral(item.storageBalance).format("0.00") : 0,
                      Difference: item.difference ? numeral(item.difference).format("0.00") : 0
                    };

                    data.push(newData);
                  }

                  return data;
              });
        } else {
            this.error.dateReport = "Tanggal Harus Diisi";
        }
        // if (this.zona == "GUDANG AVAL") {
        //     if (this.dateReport) {
        //         this.listDataFlag = true;
        //         this.error = {};
        //         this.table.refresh();
        //     } else {
        //         this.error.dateReport = "Tanggal Harus Diisi";
        //     }
        // } else {
        //     // if (this.dateFrom && this.dateTo) {
        //     if (this.dateReport) {
        //         this.listDataFlag = true;
        //         this.error = {}
        //         this.table.refresh();
        //     } else {
        //         // if (!this.dateFrom) {
        //         //     this.error.dateFrom = "Tanggal Harus Diisi";
        //         // }
        //         // if (!this.dateTo) {
        //         //     this.error.dateTo = "Tanggal Harus Diisi";
        //         // }
        //         this.error.dateReport = "Tanggal Harus Diisi";
        //     }
        // }
    }

    reset() {
        this.dateFrom = undefined;
        this.dateTo = undefined;
        this.unit = undefined;
        this.packingType = undefined;
        this.inventoryType = undefined;
        this.selectedConstruction = null;
        this.selectedBuyer = null;
        this.selectedProductionOrder = null;
        this.listDataFlag = false;
        this.dateReport = undefined;
        this.zona = "INSPECTION MATERIAL";
        //this.table.refresh();
        this.error = {};
        this.sumStockOpname = 0;
        this.sumStorageBalance = 0;
        this.sumDifference = 0;
        this.isEmpty = true;
        this.data = [];
    }
    context = ["detail"]
    contextClickCallback(event) {
        var arg = event.detail;
        // var data = arg.data;
        var data = {};
        data.dateReport = this.dateReport;
        data.zona = this.zona;
        data.buyer = this.buyer;
        data.data = arg.data;
        console.log(data);
        switch (arg.name) {
            case "detail":
                this.dialog.show(PackingListForm, data)
                    .then(response => {
                        return response;
                    });
                break;
        }
    }

    contextShowCallback(index, name, data) {
        return this.isPackingType;
        // if(this.isPackingType){
        //     return true;
        // }el
        // switch (name) {
        //     case "print":
        //         return data;
        //     default:
        //         return true;
        // }
    }

    get isAval() {
        return this.zona && this.zona == "GUDANG AVAL";
    }

    get isPackingType() {
        return this.zona && (this.zona == "GUDANG JADI" || this.zona == "SHIPPING");
    }

    get isStockOpname() {
        return this.zona && this.zona == "STOCK OPNAME";
    }

    avalColumns = [
        { field: "avalType", title: "Nama Barang" },
        {
            field: "startAvalQuantity", title: "Awal Qty Satuan", formatter: function (value, data, index) {
                return numeral(value).format('0.00');
            }, align: "right", halign: "center"
        },
        {
            field: "inAvalQuantity", title: "Masuk Qty Satuan", formatter: function (value, data, index) {
                return numeral(value).format('0.00');
            }, align: "right", halign: "center"
        },
        {
            field: "outAvalQuantity", title: "Keluar Qty Satuan", formatter: function (value, data, index) {
                return numeral(value).format('0.00');
            }, align: "right", halign: "center"
        },
        {
            field: "endAvalQuantity", title: "Akhir Qty Satuan", formatter: function (value, data, index) {
                return numeral(value).format('0.00');
            }, align: "right", halign: "center"
        },
        {
            field: "startAvalWeightQuantity", title: "Awal Qty Berat", formatter: function (value, data, index) {
                return numeral(value).format('0.00');
            }, align: "right", halign: "center"
        },
        {
            field: "inAvalWeightQuantity", title: "Masuk Qty Berat", formatter: function (value, data, index) {
                return numeral(value).format('0.00');
            }, align: "right", halign: "center"
        },
        {
            field: "outAvalWeightQuantity", title: "Keluar Qty Berat", formatter: function (value, data, index) {
                return numeral(value).format('0.00');
            }, align: "right", halign: "center"
        },
        {
            field: "endAvalWeightQuantity", title: "Akhir Qty Berat", formatter: function (value, data, index) {
                return numeral(value).format('0.00');
            }, align: "right", halign: "center"
        }
    ];

    avalLoader = (info) => {
        var arg = {
            searchDate: moment(this.dateReport).format("DD MMM YYYY HH:mm"),
        }
        return this.listDataFlag ? this.service.searchAval(arg)
            .then((result) => {
                return {
                    data: result.data
                }
            }) : { data: [] };
    }

    exportAval() {
        var searchDate = this.dateReport ? moment(this.dateReport).format("DD MMM YYYY HH:mm") : null;
        this.service.generateExcelAval(searchDate);

    }
}

export class KeysValueConverter {
  toView(obj) {
    return Reflect.ownKeys(obj);
  }
}
