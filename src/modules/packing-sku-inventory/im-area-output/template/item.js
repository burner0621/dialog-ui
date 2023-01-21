import { inject, bindable, computedFrom } from 'aurelia-framework'
var ProductionOrderLoader = require('../../../../loader/production-order-azure-loader');

export class CartItem {
    @bindable product;
    isAval = false;
    isTransit = false;
    remarks = [];
    avalItems = [];
    isShowing = false;
    activate(context) {

        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
        this.destinationArea = this.contextOptions.destinationArea;
        this.isEdit = this.contextOptions.isEdit;


    }

    bind() {
        if (this.data.balance && !this.data.previousBalance) {
            this.data.previousBalance = this.data.balance;
        }
        if (this.destinationArea == "TRANSIT") {
            this.remarks = ["Acc Buyer", "Keputusan Prod", "Perbaikan", "Colet"];
            // this.data.status = "NOT OK";
            this.remarksGrade = [
                "A", "B", "C", "BS", "Aval 1"
            ];
            this.isTransit = true;
            this.isAval = false;
            if (!this.data.Id)
                this.data.avalItems = [];
            // if (this.data.isChecked)
            //     this.data.balance = this.data.initLength;
        } else if (this.destinationArea == "GUDANG AVAL") {
            this.remarks = [
            ];
            this.remarks = [
                "Aval 2"
            ];
            this.remarksGrade = [
                "Aval 2"
            ];
            // this.data.status = "OK";

            // if (this.data.isChecked)
            //     this.data.balance = this.data.avalALength + this.data.avalBLength + this.data.avalConnectionLength;
            this.isTransit = false;
            this.isAval = true;
            this.avalColumns = ["Jenis Aval", "Panjang"];

            // if (this.data.isChecked)
            //     this.data.balance = this.data.initLength;
        } else {
            this.data.avalItems = [];
            // this.remarks = [
            //     "A", "B", "C", "BS", "Aval 1"
            // ];
            this.remarks = [
            ];
            this.remarksGrade = [
                "A", "B", "C", "BS", "Aval 1"
            ];
            // this.data.status = "OK";
            this.isTransit = false;
            this.isAval = false;
        }
    }

    get totalBalance() {
        if (this.isAval && this.data.avalItems && this.data.avalItems.length > 0) {
            if (!this.isEdit) {

                this.data.balance = this.data.avalItems.reduce((a, b) => +a + +b.length, 0);
                this.totalBalanceAval = this.data.avalItems.reduce((a, b) => +a + +b.length, 0);;
            }

            this.totalBalanceAval = this.data.avalItems.reduce((a, b) => +a + +b.length, 0);

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

    addAvalItemCallback = (e) => {
        this.data.avalItems = this.data.avalItems || [];
        this.data.avalItems.push({})
    };
}