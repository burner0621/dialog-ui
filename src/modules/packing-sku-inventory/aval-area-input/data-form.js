import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "./service";
let PackagingAreaLoader = require("../../../loader/input-packaging-loader");

@inject(Service)
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable data;
    @bindable error;
    @bindable dataIsChecked;
    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }
    dataIsChecked =[];
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
        pagination: false
    }
    // itemColumns = ["No. SPP", "Buyer", "Unit", "Material", "Warna", "Motif", "Grade", "Satuan", "Saldo"];
    itemColumns = ["No. SPP", "Qty Order","No. Kereta","Material", "Nama Barang","Unit", "Buyer", "Warna", "Motif", "Macam Barang", "Satuan","Qty IN","Zona Awal","No. Mesin"];
    
    groups = ["","A", "B"];

    columns = [
        {
            field: "isChecked", title: "isChecked Checkbox", checkbox: true, sortable: false
        },
        { field: "productionOrder.no", title: "No. SPP" },
        { field: "qtyOrder", title: "Qty Order" },
        { field: "cartNo", title: "No. Kereta" },
        { field: "construction", title: "Material" },
        { field: "productTextile.name", title: "Nama Barang" },
        { field: "unit", title: "Unit" },    
        { field: "buyer", title: "Buyer" },            
        { field: "color", title: "Warna" },
        { field: "motif", title: "Motif" },
        { field: "avalType", title: "Macam Barang" },
        { field: "uomUnit", title: "Satuan" },
        { field: "balance", title: "Qty IN" },
        { field: "area", title: "Zona Awal" }
    ];

    shifts = ["","PAGI", "SIANG"];
    constructor(service) {
        this.service = service;
    }

    @computedFrom("data.id")
    get isEdit() {
        return (this.data.id || '').toString() != '';
    }

    get packagingAreaLoader() {
        // if(this.data.packagingProductionOrders.length!= 0){
        //     return Promise.resolve().then(data=>{
        //         return this.data.packagingProductionOrders;
        //     });
        // }else{
            return PackagingAreaLoader;
        // }
    }
    areaMovementTextFormatter = (areaInput) => {
        return `${areaInput.bonNo}`
    }


    bind(context) {
        this.context = context;
        this.data = this.context.data;

        this.data.area = "PACKING";

        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;
        if(this.data.avalItems)
        {
            this.data.avalProductionOrders = this.data.avalItems
        }
        else
        {
            this.service.getPreAvalAll()
                    .then(result => {
                        var data = {}
                        var dataItem=[];
                        result.forEach(element=>{
                            element.preAvalProductionOrders.forEach(item =>{
                                item.area = element.area;
                                item.bonId = element.id;
                                dataItem.push(item);
                            });
                        });
                        data.total = dataItem.length;
                        data.data = dataItem;
                        this.data.avalProductionOrders = data.data;
                        // data.avalProductionOrders.push({});
            });
        }
    }

    ExportToExcel() {
        this.service.generateExcel(this.data.id);
    }

    addItemCallback = (e) => {
        this.data.PackagingProductionOrders = this.data.PackagingProductionOrders || [];
        this.data.PackagingProductionOrders.push({})
    };

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
    
        if (
          this.data.Shift == undefined ||
          this.data.Shift == null ||
          this.data.Shift == ""
        ) {
          this.error.Shift = "Shift Harus Diisi";
          errorIndex++;
        } else {
          this.Shift = this.data.Shift;
          this.error.Shift = "";
        }
    
        if (
          this.data.Group == undefined ||
          this.data.Group == null ||
          this.data.Group == ""
        ) {
          this.error.Group = "Group Harus Diisi";
          errorIndex++;
        } else {
          this.Group = this.data.Group;
          this.error.Group = "";
        }
    
        if (errorIndex == 0) {
          this.data.DyeingPrintingMovementIds = [];
    
          this.service.getPreAval(this.Date, this.Shift, this.Group).then((result) => {
            if (result.length > 0) {
              result.forEach((dyeingPrintingArea) => {
                var DyeingPrintingMovementIds = {};
                DyeingPrintingMovementIds.DyeingPrintingAreaMovementId =
                  dyeingPrintingArea.id;
                DyeingPrintingMovementIds.ProductionOrderIds = [];
    
                dyeingPrintingArea.preAvalProductionOrders.forEach(
                  (productionOrder) => {
                    DyeingPrintingMovementIds.ProductionOrderIds.push(
                      productionOrder.productionOrder.id
                    );
    
                    this.data.AvalJointValue +=
                      productionOrder.avalConnectionLength;
                    if (this.data.AvalJointValue > 0) {
                      this.isAvalJointEditable = false;
                    }
    
                    this.data.AvalAValue += productionOrder.avalALength;
                    if (this.data.AvalAValue > 0) {
                      this.isAvalAEditable = false;
                    }
    
                    this.data.AvalBValue += productionOrder.avalBLength;
                    if (this.data.AvalBValue > 0) {
                      this.isAvalBEditable = false;
                    }

                    this.isHasData = true;
                  }
                );
    
                this.data.DyeingPrintingMovementIds.push(DyeingPrintingMovementIds);
              });
            } else {
              this.isHasData = false;
            }
          });
        } else {
          this.error.Date;
          this.error.Shift;
        }
      }
}


