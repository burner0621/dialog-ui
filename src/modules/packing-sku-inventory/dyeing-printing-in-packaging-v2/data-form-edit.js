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
    itemColumns = ["No. SPP", "Qty Order","Buyer", "Unit", "Material", "Warna", "Motif","Mesin Produksi", "Grade", "Satuan","Qty Masuk",""];

    groups = ["","A", "B"];

    columns = [
        {
            field: "isChecked", title: "isChecked Checkbox", checkbox: true, sortable: false
        },
        { field: "productionOrder.no", title: "No. SPP" },
        { field: "qtyOrder", title: "Qty Order" },

        { field: "buyer", title: "Buyer" },
        { field: "unit", title: "Unit" },
        { field: "construction", title: "Material" },
        { field: "color", title: "Warna" },
        { field: "motif", title: "Motif" },
        { field: "grade", title: "Grade" },
        { field: "uomUnit", title: "Satuan" },
        { field: "balance", title: "Qty Masuk" },
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

    // loader = (info) => {
    //     var order = {};
    //     if (info.sort)
    //         order[info.sort] = info.order;
    //     var arg = {
    //         // page: parseInt(info.offset / info.limit, 10) + 1,
    //         page: 1,
    //         // size: info.limit,
    //         size: 9999,
    //         keyword: info.search,
    //         order: order,
    //     }
    //     if(this.data.PackagingProductionOrders== null){
    //         return this.service.listProductionOrderIn(arg)
    //             .then(result => {
    //                 var data = {}
    //                 data.total = result.total;
    //                 data.data = result.data;
    //                 // this.data = result;
    //                 return data;
    //             });
    //     }
    //     else{
    //         return Promise.resolve().then(result => {
    //             var data={};
    //             data.data = this.data.PackagingProductionOrders;
    //             data.total = 10;
    //             // data.total = this.data.PackagingProductionOrders.length;
    //             return data;
    //         });
    //     }
    // }

    bind(context) {
        this.context = context;
        this.data = this.context.data;

        this.data.area = "PACKING";

        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;
        if(this.data.packagingProductionOrders)
        {
            this.data.PackagingProductionOrders = this.data.packagingProductionOrders;
        }


        if (this.data.bonNo) {
            this.selectedPackaging = {};
            this.selectedPackaging.bonNo = this.data.bonNo;
        }
    }

    ExportToExcel() {
        this.service.generateExcel(this.data.id);
    }

    addItemCallback = (e) => {
        this.data.PackagingProductionOrders = this.data.PackagingProductionOrders || [];
        this.data.PackagingProductionOrders.push({})
    };
}


