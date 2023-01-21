import { inject, bindable, computedFrom } from "aurelia-framework";
import { Service } from "../service";

const ProductLoader = require("../../../../loader/garment-product-loader");
const UomLoader = require("../../../../loader/uom-loader");

@inject(Service)
export class Item {
    @bindable selectedSupplier;
    @bindable selectedDo;

    constructor(service) {
        this.service = service;
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;

        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.itemOptions = context.context.options;
        this.isSubconCutting = this.itemOptions.isSubconCutting;
        if (this.data && this.data.Supplier) {
            // if (this.isSubconCutting) {
            //     this.selectedSupplier = {
            //         Id: this.data.Supplier && this.data.Supplier.Id,
            //         Code: this.data.Supplier && this.data.Supplier.Code,
            //         Name: this.data.Supplier && this.data.Supplier.Name,
            //     };
            // }
        this.selectedSupplier = {
            Id: this.data.Supplier && this.data.Supplier.Id,
            Code: this.data.Supplier && this.data.Supplier.Code,
            Name: this.data.Supplier && this.data.Supplier.Name,
        };
        this.selectedDo = {
            Id: this.data.DoId,
            DoNo: this.data.DoNo,
            Quantity: this.data.Quantity,
        };
        }
        this.isShowing = true;
    }
    itemsColumnsCreate = ["Keterangan", "Jumlah", "Jumlah Keluar", ""];

    itemsColumns = ["Keterangan", "Jumlah Keluar", ""];

    toggle() {
        if (!this.isShowing) this.isShowing = true;
        else this.isShowing = !this.isShowing;
    }

    productView = (product) => {
        return `${product.code || product.Code} - ${product.name || product.Name}`;
    };

    get productLoader() {
        return ProductLoader;
    }

    get uomLoader() {
        return UomLoader;
    }

}
