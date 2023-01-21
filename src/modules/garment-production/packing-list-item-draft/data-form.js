import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

@inject(Service)
export class DataForm {

    @bindable readOnly = false;
    @bindable title;

    constructor(service) {
        this.service = service;
    }

    formOptions = {
        cancelText: "Back"
    }

    activeTab = 0;
    changeRole(tab) {
        this.activeTab = tab;

    }

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };

    footerOptions = {
        label: {
            length: 3
        },
        control: {
            length: 2
        }
    };

    itemsColumns = [
        { header: "RO No" },
        { header: "Buyer Brand" },
        //{ header: "Seksi" },
        { header: "Komoditi Description" },
        { header: "Qty" },
        { header: "Satuan" },
        { header: "Unit" },
        { header: "" },
    ]

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;

        this.Options = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            isEdit: this.context.isEdit,
            checkedAll: this.context.isCreate == true ? false : true,
            header: this.data
        }
    }

    get addItems() {
        return (event) => {
            this.data.items.push({

                details: []
            });
        };
    }

    get removeItems() {
        return (event) => {
            this.data.grossWeight = this.data.items.reduce((acc, cur) => acc += cur.avG_GW, 0);
            this.data.nettWeight = this.data.items.reduce((acc, cur) => acc += cur.avG_NW, 0);
            this.error = null;
        };
    }

    // get totalCartons() {
    //     let cartons = [];
    //     if (this.data.items) {
    //         for (var item of this.data.items) {
    //             if (item.details) {
    //                 for (var detail of item.details) {
    //                     if (detail.cartonQuantity && cartons.findIndex(c => c.carton1 == detail.carton1 && c.carton2 == detail.carton2) < 0) {
    //                         cartons.push({ carton1: detail.carton1, carton2: detail.carton2, cartonQuantity: detail.cartonQuantity });
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     this.data.totalCartons = cartons.reduce((acc, cur) => acc + cur.cartonQuantity , 0);
    //     return this.data.totalCartons;
    // }

    get totalCartons() {
        let result = 0;
        if (this.data.items) {
            for (var item of this.data.items) {
                if (item.details) {
                    const newDetails = item.details.map(d => {
                        return {
                            carton1: d.carton1,
                            carton2: d.carton2,
                            cartonQuantity: d.cartonQuantity,
                            index: d.index
                        };
                    }).filter((value, i, self) => self.findIndex(f => value.carton1 == f.carton1 && value.carton2 == f.carton2 && value.index == f.index) === i);

                    for (var detail of newDetails) {
                        const cartonExist = false;
                        const indexItem = this.data.items.indexOf(item);
                        if (indexItem > 0) {
                            for (let i = 0; i < indexItem; i++) {
                                const item = this.data.items[i];
                                for (const prevDetail of item.details) {
                                    if (detail.carton1 == prevDetail.carton1 && detail.carton2 == prevDetail.carton2 && detail.index == prevDetail.index) {
                                        cartonExist = true;
                                        break;
                                    }
                                }
                            }
                        }
                        if (!cartonExist) {
                            result += detail.cartonQuantity;
                        }
                    }
                }
            }
            this.data.totalCartons = result;
            return this.data.totalCartons;
        }
    }

    get totalQuantities() {
        let quantities = [];
        let result = [];
        let units = [];
        if (this.data.items) {
            var no = 1;
            for (var item of this.data.items) {
                let unit = "";
                if (item.uom) {
                    unit = item.uom.unit || item.uom.Unit;
                }
                // if (item.quantity && quantities.findIndex(c => c.roNo == item.roNo && c.unit == unit) < 0) {
                quantities.push({ no: no, roNo: item.roNo, unit: unit, quantityTotal: item.quantity });
                if (units.findIndex(u => u.unit == unit) < 0) {
                    units.push({ unit: unit });
                    // }
                }
                no++;

            }
        }
        for (var u of units) {
            let countableQuantities = 0;
            for (var q of quantities) {
                if (q.unit == u.unit) {
                    countableQuantities += q.quantityTotal;
                }
            }
            result.push(countableQuantities + " " + u.unit);
        }
        return result.join(" / ");
    }



}
