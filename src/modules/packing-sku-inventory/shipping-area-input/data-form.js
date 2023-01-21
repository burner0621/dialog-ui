import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "./service";
let PreShippingAreaLoader = require("../../../loader/pre-input-shipping-loader");
let FilterDOLoader = require("../../../loader/pre-input-shipping-do-loader");

@inject(Service)
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable data;
    @bindable error;
    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }
    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };
    imQuery = { "DestinationArea": "TRANSIT" }
    shippingTypes = ["ZONA GUDANG", "RETUR BARANG"];
    itemColumns = ["No. DO", "No. SPP", "Qty Order", "Buyer", "Material", "Nama Barang", "Unit", "Warna", "Motif", "Grade", "QTY Packing", "Packing", "Panjang per Packing", "QTY Masuk", "Satuan"];

    
    returItemColumns = ["No. DO", "No. SPP", "Qty Order", "Buyer", "Material", "Nama Barang","Unit", "Warna", "Motif", "Grade", "Jenis Packing", "QTY Packing", "Packing", "Panjang per Packing", "QTY Masuk", "Satuan"];
    shifts = ["PAGI", "SIANG"];
    areas = ["INSPECTION MATERIAL", "PROD", "TRANSIT", "PACK", "GUDANG JADI", "SHIPPING", "AWAL", "LAB"]
    constructor(service) {
        this.service = service;
    }

    get preShippingAreaLoader() {
        return PreShippingAreaLoader;
    }


    groups = ["A", "B"];

    areaMovementTextFormatter = (areaInput) => {
        return `${areaInput.bonNo}`
    }

    returDetailOptions = {};
    detailOptions = {};
    @computedFrom("data.id")
    get isEdit() {
        return (this.data.id || '').toString() != '';
    }

    // @computedFrom("data.shippingType")
    // get isRetur(){
    //     return this.data && this.data.shippingType == "RETUR BARANG";
    // }

    @bindable ItemCollections;
    @bindable shippingType;
    shippingTypeChanged(n, o) {
        if (this.shippingType) {
            this.data.shippingType = this.shippingType;
            this.isRetur = this.shippingType == "RETUR BARANG";
            this.returDetailOptions.isRetur = this.isRetur;
            this.detailOptions.isRetur = this.isRetur;
        } else {
            this.data.shippingType = null;
        }
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.type = this.context.type;
        console.log(this.type);
        this.data.area = "SHIPPING";

        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;
        this.detailOptions = {
            isEdit: this.isEdit
        }

        this.returDetailOptions = {
            isEdit: this.isEdit,
            type: this.type
        };

        if (this.isEdit && !this.readOnly) {
            this.itemColumns = ["No. DO", "No. SPP", "Qty Order", "Buyer", "Material", "Nama Barang", "Unit", "Warna", "Motif", "Grade", "QTY Packing", "Packing", "Panjang per Packing", "QTY Masuk", "Satuan", ""];
        } else {
            if(this.type == true){
                this.itemColumns = ["No. DO", "No. SPP", "Qty Order", "Buyer", "Material", "Nama Barang", "Unit", "Warna", "Motif", "Grade", "QTY Packing", "Packing", "QTY Masuk", "Satuan"];    
            }else{
            this.itemColumns = ["No. DO", "No. SPP", "Qty Order", "Buyer", "Material", "Nama Barang", "Unit", "Warna", "Motif", "Grade", "QTY Packing", "Packing", "Panjang per Packing", "QTY Masuk", "Satuan"];
            }
        }

        if (this.data.shippingProductionOrders) {
            this.data.displayShippingProductionOrders = this.data.shippingProductionOrders;
        }

        if (this.data.shippingType) {
            this.shippingType = this.data.shippingType;
            this.isRetur = this.shippingType == "RETUR BARANG";
            this.returDetailOptions.isRetur = this.isRetur;
            this.detailOptions.isRetur = this.isRetur;
        }
        // if (this.data.bonNo) {
        //     this.selectedPreShipping = {};
        //     this.selectedPreShipping.bonNo = this.data.bonNo;
        // }
    }
    addItemCallback = (e) => {
        this.data.shippingProductionOrders = this.data.shippingProductionOrders || [];
        this.data.shippingProductionOrders.push({})
    };


    get filterDOLoader() {
        return FilterDOLoader;
      }

      doTextFormatter = (doNo) => {
        return `${doNo.deliveryOrder.no}`
      }


      @bindable selectedFilterDO;
      async selectedFilterDOChanged(n, o) {
        // if (this.selectedFilterSPP) {
            console.log(n);
       
            if (this.selectedFilterDO) {

                this.data.displayShippingProductionOrders = await this.service.getDeliveryOrderInputv2ById(this.selectedFilterDO.deliveryOrder.id);
                if (this.ItemsCollection) {
                    this.ItemsCollection.bind();
                }
            } else {
    
                this.data.displayShippingProductionOrders = await this.service.getProductionOrderOutput();
                if (this.ItemsCollection) {
                    this.ItemsCollection.bind();
                }
            }

           


        //   this.shippingProductionOrders = await this.service.getDeliveryOrderInputv2ById(this.selectedFilterDO.deliveryOrder.id);
        //   console.log(this.shippingProductionOrders);
     
    
      }

    // @bindable selectedPreShipping;
    // selectedPreShippingChanged(n, o) {
    //     if (this.selectedPreShipping) {
    //         this.data.outputInspectionMaterialId = this.selectedPreShipping.id;

    //         this.detailOptions.dyeingPrintingAreaInputId = this.selectedPreShipping.id;
    //     }

    // }
}


