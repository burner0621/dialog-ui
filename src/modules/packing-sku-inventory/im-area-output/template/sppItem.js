import { inject, bindable, computedFrom } from 'aurelia-framework'
var ProductionOrderLoader = require('../../../../loader/production-order-azure-loader');

export class CartItem {
    sppColumns = [];
    sppOptions = {};
    isAval = false;
    isShowing = false;
    isProduksi = false;
    avalColumns = ["Grade", "Macam Barang", "Panjang"];
    avalMachines = ["QC 01", "QC 02", "QC 03", "QC 04", "QC 05", "QC 06", "QC 07", "QC 08", "QC 09", "QC 10"];
    productionMachine = ["BUSER", "ICHINOSE", "ROTARY", "ZIMMER", "CRF", "MONFORT"];


    activate(context) {

        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
        this.destinationArea = this.contextOptions.destinationArea;


        if (this.destinationArea == "GUDANG AVAL") {
            this.isAval = true;
        } else {
            this.isAval = false;
        }

        if (this.destinationArea == "PRODUKSI") {
            this.isProduksi = true;
        } else {
            this.isProduksi = false;
        }

        this.isEdit = this.contextOptions.isEdit;
        this.sppOptions.destinationArea = this.destinationArea;

        if (this.data.balance && !this.data.previousBalance) {
            this.data.previousBalance = this.data.balance;
        }

        if (this.destinationArea === "TRANSIT") {
            this.sppColumns = ["Keterangan Transit", "Grade", "Qty Keluar"];
        } else {
            this.sppColumns = ["Grade", "Qty Keluar"];
        }

        if (this.destinationArea == "TRANSIT") {
            this.data.status = "NOT OK";
        } else if (this.destinationArea == "GUDANG AVAL") {
            this.data.status = "OK";
        } else {
            if (this.destinationArea == "PACKING") {

                this.data.status = "OK";
            } else {

                this.data.status = "NOT OK";
            }
        }


    }

    changeCheckBox() {
        this.context.context.options.checkedAll = this.context.context.items.reduce((acc, curr) => acc && curr.data.IsSave, true);
    }

    controlOptions = {
        control: {
            length: 12
        }
    };

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    toggle() {
        if (!this.isShowing)
            this.isShowing = true;
        else
            this.isShowing = !this.isShowing;
    }

    addSPPDetailCallback = (e) => {
        this.data.productionOrderDetails = this.data.productionOrderDetails || [];
        this.data.productionOrderDetails.push({

        });
    };
}
