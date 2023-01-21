import { inject, bindable, computedFrom } from 'aurelia-framework'
var ProductLoader = require('../../../../../loader/product-azure-loader');

export class CartItem {
    @bindable product;

    activate(context) {
        
        this.context = context;
        this.data = context.data;
        if (this.data.Product && this.data.Product.Id) {
            this.product = this.data.Product;
        }
        this.Input = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
    }


    controlOptions = {
        control: {
            length: 12
        }
    };

    get productLoader() {
        return ProductLoader;
    }

    productView = (product) => {
        return `${product.Code} - ${product.Name}`
    }

    productChanged(n, o){
        if (this.product && this.product.Id) {
            this.data.ProductId = this.product.Id;
        }
    }
}