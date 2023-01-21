import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service } from "./service";

// var BuyerLoader = require('../../../loader/garment-buyers-loader');
const SupplierLoader = require('../../../loader/garment-supplier-loader');
const UomLoader = require("../../../loader/uom-loader");

@inject(Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable title;
    @bindable data = {};
    @bindable selectedContractType;
    @bindable selectedSubconCategory;

    ContractTypeOptions = ["SUBCON GARMENT", "SUBCON BAHAN BAKU", "SUBCON JASA"];
    SubconCategoryTypeOptions=["SUBCON CUTTING SEWING","SUBCON SEWING"];
    constructor(service) {
        this.service = service;
    }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    };

    // itemsInfo = {
    //     columnsCuttingSewing: [
    //         "Barang",
    //         "Jumlah",
    //         "Satuan",
    //         "Nilai CIF"
    //     ],
    
    //     columnsSewing: [
    //         "Barang",
    //         "Jumlah",
    //         "Satuan",
    //     ],

    // }

    columns= [
        "Barang",
        "Jumlah",
        "Satuan",
        "CIF"
    ];

    garmentColumns= [
        "Barang",
        "Jumlah",
        "Satuan",
        "NW per Satuan",
        "GW per Satuan",
        "CIF"
    ];

    Uomfilter={
            'Unit=="MTR" || Unit=="PCS" || Unit=="SETS"': "true",
        };

    controlOptions = {
        label: {
            length:3
        },
        control: {
            length: 7
        }
    };

    controlOptions2 = {
        label: {
            length:3
        },
        control: {
            length: 5
        }
    };
    
    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.itemOptions = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            checkedAll: this.context.isCreate == true ? false : true,
            isEdit: this.isEdit,
            // isSubconCutting:this.data.SubconCategory == 'SUBCON CUTTING SEWING'? true:false,
          };
        this.isItems=false;
        this.selectedContractType=this.data.ContractType;
        this.selectedSubconCategory=this.data.SubconCategory;
        if(this.data.SubconCategory=="SUBCON CUTTING SEWING"||this.data.SubconCategory=="SUBCON SEWING" || this.data.SubconCategory=="SUBCON JASA KOMPONEN"){
            this.isItems=true;
        }
        if(this.data.Items){
            for(var item of this.data.Items){
                item.ContractType=this.data.ContractType;
            }
        }
    }

    get uomLoader() {
        return UomLoader;
    }

    // get buyerLoader() {
    //     return BuyerLoader;
    // }
    // buyerView = (buyer) => {
    //     var buyerName = buyer.Name || buyer.name;
    //     var buyerCode = buyer.Code || buyer.code;
    //     return `${buyerCode} - ${buyerName}`
    // }

    supplierView = (supplier) => {
        var code= supplier.code || supplier.Code;
        var name=supplier.name || supplier.Name;
        return `${code} - ${name}`;
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    get JobType(){
        return (this.data.JobType || "").toUpperCase();
    }
    set JobType(value){
        this.data.JobType=value.toUpperCase();
    }

    get BPJNo(){
        return (this.data.BPJNo || "").toUpperCase();
    }
    set BPJNo(value){
        this.data.BPJNo=value.toUpperCase();
    }
    
    get FinishedGoodType(){
        return (this.data.FinishedGoodType || "").toUpperCase();
    }
    set FinishedGoodType(value){
        this.data.FinishedGoodType=value.toUpperCase();
    }
    
    get AgreementNo(){
        return (this.data.AgreementNo || "").toUpperCase();
    }
    set AgreementNo(value){
        this.data.AgreementNo=value.toUpperCase();
    }
    
    // get ContractNo(){
    //     return (this.data.ContractNo || "").toUpperCase();
    // }
    set ContractNo(value){
        this.data.ContractNo=value.toUpperCase();
    }
    
    get SKEPNo(){
        return (this.data.SKEPNo || "").toUpperCase();
    }
    set SKEPNo(value){
        this.data.SKEPNo=value.toUpperCase();
    }

    selectedContractTypeChanged(newValue){
        if(this.data.ContractType!=newValue){
            this.data.ContractType=newValue;
            if(this.data.Items){
                this.data.Items.splice(0);
            }
            if(this.data.ContractType=="SUBCON GARMENT"){
                this.SubconCategoryTypeOptions=["SUBCON CUTTING SEWING","SUBCON SEWING"];
            }
            else if(this.data.ContractType=="SUBCON BAHAN BAKU"){
                this.SubconCategoryTypeOptions=["SUBCON BB SHRINKAGE/PANEL","SUBCON BB FABRIC WASH/PRINT"];
            }
            else if(this.data.ContractType=="SUBCON JASA"){
                this.SubconCategoryTypeOptions=["SUBCON JASA GARMENT WASH","SUBCON JASA KOMPONEN"];
            }
        }

        // this.itemOptions.isSubconCutting = this.data.SubconCategory == "SUBCON CUTTING SEWING"?true : false;
        
    }

    selectedSubconCategoryChanged(newValue){
        if(newValue!=this.data.SubconCategory){
            this.data.SubconCategory=newValue;
            if(this.data.Items){
                this.data.Items.splice(0);
            }
            if(this.data.SubconCategory=="SUBCON CUTTING SEWING"||this.data.SubconCategory=="SUBCON SEWING" || this.data.SubconCategory=="SUBCON JASA KOMPONEN"){
                this.isItems=true;
            }
            else{
                this.isItems=false;
            }
            // this.itemOptions.isSubconCutting = this.data.SubconCategory == "SUBCON CUTTING SEWING"? true:false;
        }
        
    }

    get addItems() {
        return (event) => {
          this.data.Items.push({ContractType: this.data.ContractType});
        };
      }
    
      get removeItems() {
        return (event) => {
          this.error = null;
        };
      }
    
}