import { bindable, inject, containerless, computedFrom, BindingEngine } from "aurelia-framework";
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from "./service";

var UnitLoader = require('../../../../loader/unit-loader');

@containerless()
@inject(Service, BindingSignaler, BindingEngine)
export class DataForm {
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable isComplete = false;
    @bindable title;
    @bindable readOnly;
    @bindable data;
    @bindable error;

    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;

        this.itemsOptions = {
            productionOrderFilter: {
                "isClosed": false
            },
            isTest: false
        }
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.type = this.data.RequestType || null;

        if (this.data.Unit && this.data.Unit.Id) {
            this.selectedUnit = this.data.Unit;
        }

        this.itemsOptions.isTest = this.data.RequestType && (this.data.RequestType.toUpperCase() == "TEST" || this.data.RequestType.toUpperCase() == "PEMBELIAN") ? true : false;
        this.itemsOptions.isComplete = this.context.isComplete ? true : false;
        this.itemsOptions.isAwal = this.data.RequestType && this.data.RequestType.toUpperCase() == "AWAL" ? true : false;
        this.itemsOptions.isView = this.context.isView ? true : false;
        this.itemsOptions.isEdit = this.context.isEdit ? true : false;

        if (this.context.isComplete) {
            this.data.MaterialsRequestNote_Items.map((item) => {
                item.isDisabled = item.ProductionOrder.isCompleted ? true : false;
                return item;
            })
        }
        // this.readOnly = this.itemsOptions.isComplete;
        // this.isView = this.itemsOptions.isComplete;
        // this.itemsOptions.        

    }

    numberOptions = {
        control: {
            length: 2
        }
    }

    @bindable unitFilter = { "DivisionName": "DYEING & PRINTING" };
    typeItems = ["", "AWAL", "PENGGANTI BAD OUTPUT", "TEST", "PEMBELIAN"];

    itemsOptions = {};
    @bindable selectedUnit;
    selectedUnitChanged(newVal, oldVal) {
        if (this.selectedUnit && this.selectedUnit.Id) {
            this.data.Unit = this.selectedUnit;
            this.data.Unit._id = this.data.Unit.Id;
            this.data.Unit.name = this.data.Unit.Name;
            this.data.Unit.code = this.data.Unit.Code;
            if(this.itemsOptions.productionOrderFilter["OrderTypeName"]){
                delete this.itemsOptions.productionOrderFilter["OrderTypeName"];
            } else {
                delete this.itemsOptions.productionOrderFilter['OrderTypeName.Contains("PRINTING")'];
            }
            var filter = this.selectedUnit.Name && this.selectedUnit.Name.toUpperCase() === "PRINTING" ? { "OrderTypeName": "PRINTING" } : { 'OrderTypeName.Contains("PRINTING")': "false" };
            Object.assign(this.itemsOptions.productionOrderFilter, filter);
            if (oldVal){
                this.data.MaterialsRequestNote_Items.splice(0, this.data.MaterialsRequestNote_Items.length);
            }
        }
        else {
            this.data = {};
            this.data.MaterialsRequestNote_Items.splice(0, this.data.MaterialsRequestNote_Items.length);
        }
    }

    get unitLoader() {
        return UnitLoader;
    }

    @bindable type;
    typeChanged(newVal, oldVal) {
        this.data.RequestType = newVal ? newVal : this.data.RequestType;

        delete this.itemsOptions.productionOrderFilter["isRequested"];
        if (newVal && (newVal.toUpperCase() == "AWAL" || newVal.toUpperCase() == "PEMBELIAN")) {
            var filter = {
                "isRequested": false
            }
            Object.assign(this.itemsOptions.productionOrderFilter, filter);
        }

        if (oldVal){
            this.data.MaterialsRequestNote_Items.splice(0, this.data.MaterialsRequestNote_Items.length);
        }
    }

    get itemHeader() {
        if (this.data.RequestType && (this.data.RequestType.toUpperCase() === "TEST" || this.data.RequestType.toUpperCase() == "PEMBELIAN")) {
            return [
                { header: "Nama Barang", value: "Product" },
                { header: "Grade", value: "Grade" },
                { header: "Panjang (Meter)", value: "Length" },
                { header: "Keterangan", value: "Remark" }
            ];
        } else if (this.data.RequestType && (this.context.isView && this.data.RequestType.toUpperCase() == "AWAL")) {
            return ["No. Spp", "Nama Barang", "Grade", "Panjang SPP (Meter)", "Panjang SPB (Meter)", "Panjang Realisasi (Meter)", "Keterangan", "Status"];
        } else if (this.context.isComplete) {
            return ["Pilih", "No. Spp", "Nama Barang", "Grade", "Panjang SPP (Meter)", "Panjang SPB (Meter)", "Panjang Realisasi (Meter)", "Keterangan", "Status"];
        } else {
            return [
                { header: "No. SPP", value: "ProductionOrder" },
                { header: "Nama Barang", value: "Product" },
                { header: "Grade", value: "Grade" },
                { header: "Panjang SPP (Meter)", value: "OrderQuantity" },
                { header: "Panjang SPB (Meter)", value: "Length" },
                { header: "Keterangan", value: "Keterangan" },
            ];
        }

    }

    itemInfo = {
        onAdd: function () {
            this.data.MaterialsRequestNote_Items.push({
                ProductionOrder: null,
                Product: null,
                Grade: "",
                Length: 0
            });
            this.itemsOptions.isTest = this.data.RequestType && (this.data.RequestType.toUpperCase() == "TEST" || this.data.RequestType.toUpperCase() == "PEMBELIAN") ? true : false;
        }.bind(this),
        onRemove: function () {

        }.bind(this)
    }

    unitView = (unit) => {
        return `${unit.Name}`
    }
} 