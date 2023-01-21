import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { GarmentProductionService } from "./service";

const UnitLoader = require('../../../../../loader/garment-unitsAndsample-loader');

@inject(GarmentProductionService)
export class DataForm {

    constructor(garmentProductionService) {
        this.garmentProductionService = garmentProductionService;
    }

    @bindable readOnly = false;
    @bindable title;
    @bindable selectedExpenditureGood;
    @bindable selectedUnitFrom;

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };

    itemsColumns = [
        { header: "No Bon Pengeluaran", value: "ExpenditureNo" },
        { header: "RO", value: "RO" },
        { header: "Artikel", value: "Article" },
        { header: "Buyer", value: "Buyer" },
        { header: "Komoditi", value: "ComodityName" },
        { header: "Jumlah", value: "Quantity" }
    ];

    get unitLoader() {
        return UnitLoader;
    }



    // get expenditureGoodLoader() {
    //     return (keyword) => {
    //         var info = {
    //           keyword: keyword,
    //           filter: JSON.stringify({UnitId: this.data.UnitFrom.Id, ExpenditureType:"SISA", IsReceived:false})
    //         };
    //         return this.garmentProductionService.getExpenditureGood(info)
    //             .then((result) => {
    //                     return result.data;

    //             });
    //     }
    // }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }


    selectedUnitFromChanged(newValue) {
        if (this.data.Id) return;

        this.data.UnitFrom = newValue;

        this.selectedExpenditureGood = null;

    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.itemOptions = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            isEdit: this.context.isEdit,
        }
        if (this.data && this.data.Id) {
            this.selectedUnitFrom = {
                Code: this.data.UnitFrom.Code,
                Name: this.data.UnitFrom.Name
            };
            this.data.DataItems = [];
            for (const item of this.data.Items) {
                item.dataDetails = [];
                let detail = {
                    ExpenditureGoodItemId: item.ExpenditureGoodItemId,
                    Quantity: item.Quantity,
                    qty: item.Quantity,
                    LeftoverComodity: item.LeftoverComodity,
                    Id: item.Id,
                    BasicPrice: item.BasicPrice
                };
                if (this.data.DataItems.length > 0) {
                    var duplicate = this.data.DataItems.find(a => a.ExpenditureGoodNo == item.ExpenditureGoodNo);
                    if (duplicate) {
                        var idx = this.data.DataItems.indexOf(duplicate);
                        duplicate.Quantity += item.Quantity;
                        duplicate.dataDetails.push(detail);

                        this.data.DataItems[idx] = duplicate;
                    }
                    else {
                        item.dataDetails.push(detail);
                        this.data.DataItems.push(item);
                    }
                }
                else {
                    item.dataDetails.push(detail);
                    this.data.DataItems.push(item);
                }

            }
            // if(this.data.DataItems){
            //     var duplicate= this.data.DataItems.find(a=>a.Size.Id==item.Size.Id && a.Uom.Id==item.Uom.Id);

            //     if(duplicate){
            //         var idx= this.data.Items.indexOf(duplicate);
            //         duplicate.Quantity+=item.Quantity;
            //         this.data.DataItems[idx]=duplicate;
            //     }else{
            //         item.Size={
            //             Id: item.Size.Id,
            //             Name: item.Size.Name
            //         };
            //         item.SizeName=item.Size.Name;
            //         item.Quantity=item.Quantity;
            //         item.Uom= item.Uom;
            //         item.UomUnit= item.Uom.Unit;
            //         item.Remark= item.Remark;

            //         this.data.DataItems.push(item);
            //     }
            // }
            // else{
            //     item.Size={
            //         Id: item.Size.Id,
            //         Name: item.Size.Name
            //     };
            //     item.SizeName=item.Size.Name;
            //     item.Quantity=item.Quantity;
            //     item.Uom= item.Uom;
            //     item.UomUnit= item.Uom.Unit;
            //     item.Remark= item.Remark;
            //     this.data.DataItems.push(item);
            // }
            console.log(this.data.DataItems)
        }
    }



    get addItems() {
        return (event) => {
            this.data.DataItems.push({
                unitId: this.data.UnitFrom.Id
            })
        };
    }

    get removeItems() {
        return (event) => {
            this.error = null;
        };
    }
}