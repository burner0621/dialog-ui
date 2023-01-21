import { inject, bindable, computedFrom } from 'aurelia-framework';
var ProductLoader = require('../../../../../loader/product-loader');

export class CartItem {

    activate(context) {

        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
        this.Type = this.contextOptions.type;

        console.log(this.Type);
        console.log(this.options);

        if (this.data.Product) {
            this.selectedProduct = this.data.Product;
        }

        // if (this.data.SubType) {
        //     this.subtype = this.data.SubType;
        // }


    }
    productQuery = {
        "Tags": "Dye Stuff Printing"
    }
    
    subTypes = ["REAKTIF", "RESIST", "PIGMENT", "BROM"];

    controlOptions = {
        control: {
            length: 12
        }
    };

    get productLoader() {
        return ProductLoader;
    }

    @bindable selectedProduct;
    selectedProductChanged(newValue, oldValue) {
        if (this.selectedProduct && this.selectedProduct.Id) {
            this.data.Product = this.selectedProduct;

        }
        else {
            this.data.Product = {};
        }
    }

}