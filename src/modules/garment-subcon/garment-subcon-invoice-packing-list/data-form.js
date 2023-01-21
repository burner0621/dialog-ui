import { bindable, inject, computedFrom, BindingEngine } from "aurelia-framework";
import { countBy, propertyOf } from "underscore";
import { items } from "../../garment-shipping/export-sales-do/template/item";
import { item } from "../../garment-shipping/payment-disposition-recap/template/item";
import { Service, CoreService } from "./service";

var BuyerLoader = require('../../../loader/garment-buyers-loader');
const SupplierLoader = require('../../../loader/garment-supplier-loader');
const ContractLoader = require('../../../loader/garment-subcon-contract-loader');
const UomLoader = require("../../../loader/uom-loader");

@inject(Service,BindingEngine,CoreService)
export class DataForm {
    @bindable readOnly = false;
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView;
    @bindable title;
    @bindable data = {};
    @bindable selecteBCType;
    @bindable selectedContract;
    @bindable selectedSupplier;
    
 

    BCType = ["", "BC 2.6.2","BC 2.6.1", "BC 2.7 IN", "BC 2.7 OUT"];
    constructor(service,bindingEngine,CoreService) {
        this.service = service;
        this.bindingEngine = bindingEngine;
        this.CoreService = CoreService;
    }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    };

    columns= [
        "No SJ",
        "Tanggal SJ",
        // "Kode Barang",
        // "Nama Barang",
        // "Keterangan Barang",
        // "Design Color",
        "Jumlah",
        "Perhitungan NW",
        "Perhitungan GW",
        // "Satuan",
        "Harga Satuan",
        "Harga Total",
    ];

    controlOptions = {
        label: {
            length: 5,
        },
        control: {
            length: 7,
        },
    };
    
    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.itemOptions = {
            datas : this.data,
            selectedContract :this.data.ContractNo,
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            checkedAll: this.context.isCreate == true ? false : true,
            isEdit: this.isEdit,
          };

        if(this.isEdit){
            this.data.ContractNo = this.selectedContract;
        }
        console.log(this.data);

        console.log("edit",this.isEdit);
        console.log("editsss", this.data.ContractNo);
        // else{
        //     this.data.ContractNo = this.selectedContract;
        // }
        this.error = this.context.error;
        // this.itemOptions = {
            // this.isCreate= this.context.isCreate,
            // this.isView= this.context.isView,
            // this.checkedAll= this.context.isCreate == true ? false : true,
            // this.isEdit= this.isEdit,
            // filter: this.filter,
        //   };
        this.isItems=true;
        this.selecteBCType=this.data.BCType;
        this.selectedContract = this.data.ContractNo;
        this.selectedSupplier = this.data.Supplier;
        // this.data.Supplier.name = this.data.Supplier.Name;
        // this.data.Supplier.address = this.data.Supplier.Address;
        // this.data.NettWeight = this.data.NettWeight;
        this.data.NW = this.data.NW;
        this.data.GW = this.data.GW;
        this.data.isEdit = this.isEdit;
        console.log(this.data.NW);
        console.log(this.data.GW);
    }

    // @computedFrom("data.ContractNo")
    // get filter() {
    //     var filter = {
    //         "ContractNo" : this.data.ContractNo ? this.data.ContractNo : "",
    //     }
     
    //     return filter;
        
    // }

    supplierView = (supplier) => {
        var code= supplier.code || supplier.Code;
        var name=supplier.name || supplier.Name;
        return `${code} - ${name}`;
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    Supplier = null;
    selectedSupplierChanged(newValue){
        var selectedSupplier = newValue;
        if (newValue) {
            this.Supplier = selectedSupplier;

            this.data.Supplier = this.Supplier;
            
            
        }
    }

    get contractLoader() {
        return ContractLoader;
    }

    contractView = (contract) => {
        return `${contract.ContractNo}`;
    }

    selecteBCTypeChanged(newValue){
        if(this.data.BCType!=newValue){
            this.data.BCType=newValue;

        }
    }

    async selectedContractChanged(newValue){
        var selectedContract = newValue;
        console.log(newValue);
        if (newValue && !this.data.isView && !this.data.isEdit) {
            this.data.ContractNo = selectedContract.ContractNo;
            this.data.CIF = newValue.CIF;
            //this.data.NettWeight = newValue.NettWeight;
            // this.data.Quantity = newValue.Quantity;
            // this.data.NettWeight = newValue.NettWeight*this.data.Quantity;
            // this.data.GW = newValue.GrossWeight*this.data.Quantity;
            // this.data.NettWeight = newValue.NettWeight;
            this.data.NW = newValue.NettWeight;
            this.data.GW = newValue.GrossWeight;
            var suppliers = await this.CoreService.GetGarmentSupplier({ size: 1, keyword: '', filter: JSON.stringify({ Code: newValue.Supplier.Code }) });
            this.Supplier = suppliers.data[0];
            this.data.Supplier = this.Supplier;
            
            // console.log(this.data.CIF)
            // if(this.data.Items){
            //     this.data.Items.splice(0);
            // }
        }
    }

    

    get addItems() {
        return (event) => {
          this.data.Items.push({});
        };
      }
    
      get removeItems() {
        return (event) => {
          this.error = null;
        };
      }
    
}