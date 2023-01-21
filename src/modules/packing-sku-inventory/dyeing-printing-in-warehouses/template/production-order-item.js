import { inject, bindable, computedFrom } from 'aurelia-framework'
export class ProductionOrderItem {
    @bindable product;

    // isAval = false;
    // remarks = [];
    packingItems = [];

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
        this.data.productPackingCodeList = this.getProductPackingCodeList(this.data);
        this.isEdit = this.contextOptions.isEdit;
        this.type = this.contextOptions.type;
    }

    controlOptions = {
        control: {
            length: 12
        }
    };

    toggle() {
        if (!this.isShowing) this.isShowing = true;
        else this.isShowing = !this.isShowing;
    }

    getProductPackingCodeList(data) {


        console.log(data, data.productionOrder.No)
        const createdProductPackingCodes = data.productPackingCodeCreated ? data.productPackingCodeCreated.split(',') : [];

        const productPackingCodes = data.productPackingCode ? data.productPackingCode.split(',') : [];

        return productPackingCodes
            .filter((element) => !createdProductPackingCodes.find((createdElement) => createdElement == element))
            .map((element) => {
                return {
                    packingCode: element
                }
            })
    }

    barcodeColumns = [
        "Kode Packing"
    ];

    listOptions = {
        isEdit: this.isEdit,
        destinationArea: this.destinationArea
    };

    someCallbackFunction() {
        this.qtyPacking = this.data.productPackingCodeList.filter(d => d.IsSave).length;
    };
}