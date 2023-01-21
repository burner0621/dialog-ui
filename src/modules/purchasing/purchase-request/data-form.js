import {inject, bindable, computedFrom} from 'aurelia-framework'
var UnitLoader = require('../../../loader/unit-loader');
var BudgetLoader = require('../../../loader/budget-loader');
var CategoryLoader = require('../../../loader/category-loader');

export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    // @bindable prInternal;

    @bindable title;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        // if(this.data.internal){
        //     this.prInternal = this.data.internal;
        // }

    }

    itemsColumns = [
        { header: "Barang", value: "product" },
        { header: "Jumlah", value: "quantity" },
        { header: "Satuan", value: "product.uom" },
        { header: "Keterangan", value: "remark" }
    ]

    unitChanged(e) {
        if (this.data.unit)
        {
            this.data.unitId = this.data.unit.Id || this.data.unit._id || {};
            this.data.unit._id = this.data.unitId;

            if(this.data.unit.Division)
                this.data.unit.Division._id = this.data.unit.Division.Id || "";
        }
    }

    budgetChanged(e) {
        if (this.data.budget)
            this.data.budgetId = this.data.budget._id ? this.data.budget._id : {};
    }

    categoryChanged(e) {
        if (this.data.category)
            this.data.categoryId = this.data.category._id ? this.data.category._id : {};
    }

    // prInternalChanged(e){
    //         if(e==true){
    //             this.data.internal = true;
    //         }else{
    //             this.data.internal = false;
    //         }
    // }

    get unitLoader() {
        return UnitLoader;
    }

    get unitQuery(){
        var result = { "_CreatedBy" : "router" }
        return result;   
    }

    get budgetLoader() {
        return BudgetLoader;
    }

    get categoryLoader() {
        return CategoryLoader;
    }

    get addItems() {
        return (event) => {
            this.data.items.push({})
        };
    }
}