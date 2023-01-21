import { inject, bindable, computedFrom } from 'aurelia-framework'

var ProductLoader = require('../../../../../../loader/garment-product-loader');
var UomLoader = require('../../../../../../loader/uom-loader');

export class items {
    @bindable selectedProduct;
    @bindable selectedUom;

    filter={
        'Name.Contains("FABRIC")':false
    };

    get uomLoader() {
        return UomLoader;
    }
    
    uomView = (uom) => {
        return uom.Unit
    }

    get productLoader() {
        return ProductLoader;
    }
    
    productView = (product) => {
        return `${product.Code}-${product.Name}`
    }

    constructor() {
        
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        if(this.data){
            this.selectedProduct = this.data.Product;
            this.selectedUom = this.data.Uom;
        }
        this.readOnly = this.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.itemOptions = {
            error: this.error,
            isCreate: this.isCreate,
            readOnly: this.readOnly,
            isEdit:this.isEdit,
        };
    }

    selectedUomChanged(newValue){
        this.data.Uom=newValue;
    }

    selectedProductChanged(newValue){
        this.data.Product=newValue;
       

    }
}