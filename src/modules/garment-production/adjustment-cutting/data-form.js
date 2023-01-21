import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service } from "./service";

const UnitLoader = require('../../../loader/garment-units-loader');
const CuttingInLoader = require('../../../loader/garment-cutting-in-loader');

@inject(Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable title;
    @bindable data = {};
    // @bindable error = {};
    @bindable selectedCutting;
    @bindable selectedUnit;

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
            length: 5
        }
    };

    detailsColumns = [
        "Kode Barang",
        "Keterangan",
        "Jumlah Preparing",
        "Jumlah PCS",
        "FC",
        "Jml Preparing Aktual",
        "Sisa",
        "FC Aktual"
    ];

    detailsColumnsView = [
        { value: "ProductCode", header: "Kode Barang" },
        { value: "DesignColor", header: "Keterangan" },
        { value: "PreparingQuantity", header: "Jumlah Preparing" },
        { value: "Quantity", header: "Jumlah PCS" },
        { value: "FC", header: "FC" },
        { value: "ActualQuantity", header: "Jml Preparing Aktual" },
        { value: "RemainingQty", header: "Sisa" },
        { value: "ActualFC", header: "FC Aktual" },
    ];

    @computedFrom("data.Unit")
    get Filter() {
        if (this.data.Unit) {
            return {
                UnitId: this.data.Unit.Id,
                CuttingFrom:"PREPARING",
            };
        } else {
            return {
                UnitId: 0
            };
        }
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (this.data) {
            (this.data.Items || []).forEach(
                item => {
                    item.IsSave = true;
                    }
            );
        }
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    get unitLoader() {
        return UnitLoader;
    }
    get cuttingLoader() {
        return CuttingInLoader;
    }

    async selectedCuttingChanged(newValue){
        this.data.CutInNo = null;
        this.data.Items.splice(0);
        if(newValue){
            this.data.CutInNo= newValue.CutInNo;
            this.data.RONo= newValue.RONo;
            this.data.CutInId= newValue.Id;
            this.data.CuttingType=newValue.CuttingType;
            this.data.Article= newValue.Article;
            this.data.TotalFC=newValue.FC;
            this.data.TotalQuantity=0;
            var cutIn= await this.service.GetCuttingById(newValue.Id);
            console.log(cutIn);
            if(cutIn){
                for(var a of cutIn.Items){
                    for(var detail of a.Details){
                        var item={};
                        item.Quantity=detail.PreparingQuantity;
                        item.ActualQuantity=detail.PreparingQuantity;
                        this.data.TotalQuantity+=detail.PreparingQuantity;
                        item.CutInDetailId=detail.Id;
                        item.PreparingQuantity=detail.PreparingQuantity;
                        item.CuttingInQuantity=detail.CuttingInQuantity;
                        item.FC=detail.FC;
                        item.PreparingItemId=detail.PreparingItemId;
                        item.Product=detail.Product;
                        item.DesignColor=detail.DesignColor;
                        this.data.Items.push(item);
                    }
                }
            }
        }
    }

    selectedUnitChanged(newValue){
        this.selectedCutting=null;
        this.data.CutInNo = null;
        this.data.Items.splice(0);
        if(newValue){
            this.data.Unit=newValue;
        }
        else{
            this.data.Unit=null;
            this.selectedCutting=null;
            this.data.CutInNo = null;
            this.data.Items.splice(0);
        }
    }

    //@computedFrom("data.Items")
    get dataFC(){
        this.data.TotalActualFC=0;
        var count=0;
        var fc=0;
        this.data.TotalActualQuantity=0;
        if(this.data.Items){
            if(this.data.Items.length > 0){
                for(var a of this.data.Items){
                    this.data.TotalActualQuantity+=a.ActualQuantity;
                    fc+=a.ActualFC;
                    count++;
                }
            }
            if(fc && count){
                this.data.TotalActualFC=parseFloat((fc/count).toFixed(2));
            }
        }
        return this.data.TotalActualFC;
    }
}