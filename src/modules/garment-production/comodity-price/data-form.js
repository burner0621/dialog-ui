import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service } from "./service";

const UnitLoader = require('../../../loader/garment-sample-unit-loader');

@inject(Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable title;
    @bindable data = {};
    @bindable itemOptions = {};
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
            length: 7
        }
    };


    itemsColumns = [""];


    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.itemOptions = {
            isEdit: this.isEdit,
            checkedAll: true
        }
        this.data.Date=new Date();
        
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    get unitLoader() {
        return UnitLoader;
    }


    async selectedUnitChanged(newValue){
        this.data.Items.splice(0);
        if(newValue){
            this.data.Unit=newValue;
            if(this.isEdit){
                Promise.resolve(this.service.search({ filter: JSON.stringify({ UnitId: this.data.Unit.Id }) }))
                .then(result => {
                    for(var data of result.data){
                        var item={};
                        item.Comodity=data.Comodity;
                        item.Unit=data.Unit;
                        item.Price=data.Price;
                        item.NewPrice=data.Price;
                        item.Id=data.Id;
                        item.Date=data.Date;
                        this.data.Items.push(item);
                    }
                });
            }
        }
        else{
            this.data.Unit=null;
            this.data.Items.splice(0);
        }
    }

    
    itemsInfo = {
        columns: [
            "Komoditi",
            "Tarif"
        ]
    }

    itemsInfoEdit = {
        columns: [
            "Komoditi",
            "Unit",
            "Tarif Lama",
            "Tarif Baru"
        ]
    }

    get addItems() {
        return (event) => {
            this.data.Items.push({
                Unit: this.data.Unit,
            })
        };
    }
}