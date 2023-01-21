import { inject, bindable, computedFrom } from 'aurelia-framework'
var ProductLoader = require('../../../../../loader/product-azure-loader');
var LotConfigurationLoader = require('../../../../../loader/lot-configuration-loader');
export class CountConfigurationItem {
    @bindable lotItem;
    @bindable yarnItem;
    @bindable cottonCompositions;

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
        if (this.data) {
            this.lotItem = {};
            this.lotItem.LotNo = this.data.LotNo;
            this.lotItem.Id = this.data.LotId;
            this.yarnItem = this.data.YarnCode;

        }
        this.lotFilter = { "UnitDepartmentId": this.contextOptions.UnitDepartmentId};
    }

    lotFilter = {};
    controlOptions = {
        control: {
            length: 12
        }
    };

    itemsColumns = {
        columns: [
            { header: "Nama Serat", value: "product" },
            { header: "Komposisi(%)", value: "composition" },
        ],
    };

    toggle() {
        if (!this.isShowing)
            this.isShowing = true;
        else
            this.isShowing = !this.isShowing;
    }


    get yarnItemLoader() {
        return ProductLoader;
    }

    get lotConfigurationLoader() {
        return LotConfigurationLoader;
    }

    lotItemChanged(n, o) {
        var selectedLot = this.lotItem;
        if (selectedLot) {
            this.data.yarnItem = selectedLot.YarnType;
            this.yarnItem = selectedLot.YarnType.Code;
            this.data.lotNoItem = selectedLot.LotNo;
            this.data.cottonCompositions = selectedLot.CottonCompositions;
            this.isShowing = true;
            this.data.LotId = selectedLot.Id;
            this.data.LotNo = selectedLot.LotNo;
            this.data.YarnId = selectedLot.YarnType.Id;
            this.data.YarnCode = selectedLot.YarnType.Code;
        } else {
            this.error.lotItem = "Lot tidak ditemukan";
            this.data.yarnItem = null;
            this.yarnItem = null;
            this.data.lotNoItem = null;
            this.data.cottonCompositions = null;
            this.data.LotId = null;
            this.data.LotNo = null;
            this.data.YarnId = null;
            this.data.YarnCode = null;
        }
    }
    // yarnItemChanged(n, o) {
    //     var selectedProcess = this.yarnItem;

    //     if (selectedProcess) {
    //         var yarn = selectedProcess;
    //         var isMixDrawing = this.isMixDrawing;
    //         this.service.getLotByYarnType(yarn, true).then(result => {
    //             if (result) {

    //                 this.data.yarn = selectedProcess
    //                 this.data.lotNoItem = result.LotNo;
    //                 this.data.CottonCompositions = result.CottonCompositions;
    //             } else {
    //                 this.error.yarn = "Produk tidak ditemukan";
    //                 this.data.yarn = null;
    //                 this.data.lotNoItem = null;
    //                 this.data.CottonCompositions = null;
    //             }
    //         });
    //     }
    // }

}