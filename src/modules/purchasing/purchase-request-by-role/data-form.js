import {inject, bindable, BindingEngine, observable, computedFrom} from 'aurelia-framework'
var moment = require('moment');

@inject(BindingEngine, Element)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};

    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;
    }

    unitChanged(e) {
        var selectedUnit = e.detail || {};
        if (selectedUnit)
            this.data.unitId = selectedUnit._id ? selectedUnit._id : "";
    }


    budgetChanged(e) {
        var selectedbudget = e.detail || {};
        if (selectedbudget)
            this.data.budgetId = selectedbudget._id ? selectedbudget._id : "";
    }

    categoryChanged(e) {
        var selectedcategory = e.detail || {};
        if (selectedcategory)
            this.data.categoryId = selectedcategory._id ? selectedcategory._id : "";
    }

    removeItem(item) {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }
}