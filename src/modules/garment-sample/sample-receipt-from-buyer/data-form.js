import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service } from "./service";


@inject(Service,)
export class DataForm {
    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable title;
    @bindable data = {};
    // @bindable error = {};
    @bindable selectedSewingOut;
    @bindable itemOptions = {};
    @bindable selectedUnit;
    @bindable selectedUnitFrom;

    constructor(service) {
        this.service = service;
    }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    };

    controlOptions = {
        label: {
            length: 2
        },
        control: {
            length: 7
        }
    };


    itemsColumns = [""];


    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.Items = this.data.Items;
        this.Options = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            isEdit: this.context.isEdit,
            header: this.data
        }
        if (this.data) {
           
            this.data.SaveAs= this.data.SaveAs;
            this.data.ReceiptDate- this.data.ReceiptDate;
            
        }
       console.log(this.data);
    }

 
    ReceiptTypeOptions = ["Arsip MD","Arsip QC Buyer"];
    get addItems() {
        return (event) => {
            this.data.Items.push({    
            });
        };
    }

    get removeItems() {
        return (event) => {
            this.error = null;        };
    }
  
    itemsInfo = {
        columns: [
            "InvoiceNo",
            "Buyer",
            "RO NO",
            "Artikel",
            "Description",
            "Style",
            "Color",
            "Size",
            "Receipt Quantity"
        ]
     }
    }