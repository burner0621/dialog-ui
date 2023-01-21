import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service, SalesService } from "./service";

@inject(Service, SalesService)
export class DataForm {

    @bindable readOnly = false;
    @bindable title;

    constructor(service, salesService) {
        this.service = service;
        this.salesService = salesService;
    }

    formOptions = {
        cancelText: "Back"
    }

    activeTab = 0;
    changeRole(tab) {
        this.activeTab = tab;
        // if (tab != 2) {
        //     this.context.saveCallback=null;
        //     this.context.cancelCallback=null;
        //     this.context.deleteCallback=null;
        //     this.context.editCallback=null;
        // }
        // else{
        //     this.context.saveCallback=this.save;
        //     this.context.cancelCallback=this.cancel;
        //     this.context.deleteCallback=this.delete;
        //     this.context.editCallback=this.edit;
        // }
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
        { header: "SC No" },
        { header: "Buyer Agent" },
        { header: "Buyer Brand" },
        { header: "Seksi" },
        { header: "Komoditi Description" },
        { header: "Qty" },
        { header: "Satuan" },
        { header: "Price RO" },
        { header: "Price FOB" },
        { header: "Price CMT" },
        { header: "Mata Uang" },
        { header: "Amount" },
        { header: "Unit" },
    ]

    viewItemsColumns = [
        { header: "RO No" },
        { header: "SC No" },
        { header: "Buyer Agent" },
        { header: "Buyer Brand" },
        { header: "Seksi" },
        { header: "Komoditi Description" },
        { header: "Qty" },
        { header: "Satuan" },
        { header: "Price RO" },
        { header: "Mata Uang" },
        { header: "Amount" },
        { header: "Unit" },
        { header: "" },
    ]

    measureColumns = [
        { header: "No", value: "MeasurementIndex" },
        { header: "Length" },
        { header: "Width" },
        { header: "Height" },
        { header: "Qty Cartons" },
        { header: "CBM" },
    ]

    PackingTypeOptions = ["EXPORT", "RE EXPORT"];
    InvoiceTypeOptions = ["DL", "SM"];
    ShipmentModeOptions = ["Air", "Sea", "Courier", "Sea-Air"];

    terbilang(numeric) {
        var number = numeric;

        const first = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
        const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
        const mad = ['', 'thousand', 'million', 'billion', 'trillion'];
        let word = '';

        for (let i = 0; i < mad.length; i++) {
            let tempNumber = number % (100 * Math.pow(1000, i));
            if (Math.floor(tempNumber / Math.pow(1000, i)) !== 0) {
                if (Math.floor(tempNumber / Math.pow(1000, i)) < 20) {
                    word = first[Math.floor(tempNumber / Math.pow(1000, i))] + mad[i] + ' ' + word;
                } else {
                    word = tens[Math.floor(tempNumber / (10 * Math.pow(1000, i)))] + '-' + first[Math.floor(tempNumber / Math.pow(1000, i)) % 10] + mad[i] + ' ' + word;
                }
            }

            tempNumber = number % (Math.pow(1000, i + 1));
            if (Math.floor(tempNumber / (100 * Math.pow(1000, i))) !== 0)
                word = first[Math.floor(tempNumber / (100 * Math.pow(1000, i)))] + 'hundred ' + word;
        }
        this.say= word.toUpperCase();
    }

    shippingStaffView = (data) => {
        return `${data.Name || data.name}`
    }

    async bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.save = this.context.saveCallback;
        this.cancel = this.context.cancelCallback;
        this.delete = this.context.deleteCallback;
        this.edit = this.context.editCallback;
        this.Items = this.data.items;
        this.Options = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            isEdit: this.context.isEdit,
            checkedAll: this.context.isCreate == true ? false : true,
            header: this.data
        }
        this.isEdit = this.context.isEdit;

        this.data.items = this.Items;
        if (this.isEdit) {
            // var ROs=this.data.items.map(item => item.roNo)
            //     .filter((value, index, self) => self.indexOf(value) === index);
            // console.log(ROs);
            let itemPromises = this.data.items.map((item) => {
                return this.salesService.getCostCalculationByRO(item.roNo)
                    .then((ccg) => {
                        if (ccg) {
                            var isFabricCM = false;

                            for (var material of ccg.CostCalculationGarment_Materials) {
                                if (material.isFabricCM) {
                                    isFabricCM = true;
                                    break;
                                }
                            }
                            var fob = 0;
                            ccg.CostCalculationGarment_Materials.map((material)=>{
                                if (material.isFabricCM) {
                                    fob += parseFloat((material.CM_Price * 1.05 / ccg.Rate.Value).toFixed(2));
                                }
                            })
                            // for (var material of ccg.CostCalculationGarment_Materials) {
                                
                            // }
                            if (item.priceFOB == 0 && item.priceCMT == 0) {
                                if (isFabricCM) {
                                    item.priceCMT = parseFloat(ccg.ConfirmPrice.toFixed(2));
                                    item.priceFOB = parseFloat((ccg.ConfirmPrice + fob).toFixed(2));
                                }
                                else {
                                    item.priceCMT = 0;
                                    item.priceFOB = parseFloat(ccg.ConfirmPrice.toFixed(2));
                                }
                            }
 
                            return Promise.resolve(item);
                        }
                        else {
                            return Promise.resolve(item);
                        }
                    })
            });
            
            let items = await Promise.all(itemPromises);
            this.data.items = items;
        }
        this.data.sayUnit = this.data.sayUnit || "CARTON";

        this.shippingMarkImageSrc = this.data.shippingMarkImageFile || this.noImage;
        this.sideMarkImageSrc = this.data.sideMarkImageFile || this.noImage;
        this.remarkImageSrc = this.data.remarkImageFile || this.noImage;

        this.totalCBM="";
        var total = 0;
        if (this.data.measurements) {
            this.data.measurements.map((m)=>{
                if (m.length && m.width && m.height && m.cartonsQuantity) {
                    total += (m.length * m.width * m.height * m.cartonsQuantity / 1000000);
                }
            })
            this.totalCBM=total.toLocaleString('en-EN', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
        }

        this.terbilang(this.data.totalCartons);
        this.totalQty();
        this.data.items.map((item)=>{
            this.sumSubTotal(item);
          });
        
    }

    sumSubTotal(item) {
        item.subGrossWeight = 0;
        item.subNetWeight = 0;
        item.subNetNetWeight = 0;
        const newDetails = item.details.map(d => {
          return {
            carton1: d.carton1,
            carton2: d.carton2,
            cartonQuantity: d.cartonQuantity,
            grossWeight: d.grossWeight,
            netWeight: d.netWeight,
            netNetWeight: d.netNetWeight
          };
        }).filter((value, index, self) => self.findIndex(f => value.carton1 == f.carton1 && value.carton2 == f.carton2) === index);
        for (const detail of newDetails) {
          const cartonExist = false;
          const indexItem = this.data.items.indexOf(item);
          if (indexItem > 0) {
            for (let i = 0; i < indexItem; i++) {
              const item = this.data.items[i];
              for (const prevDetail of item.details) {
                if (detail.carton1 == prevDetail.carton1 && detail.carton2 == prevDetail.carton2) {
                  cartonExist = true;
                  break;
                }
              }
            }
          }
          if (!cartonExist) {
                item.subGrossWeight += detail.grossWeight * detail.cartonQuantity;
                item.subNetWeight += detail.netWeight * detail.cartonQuantity;
                item.subNetNetWeight += detail.netNetWeight * detail.cartonQuantity;
          }
        }
      }
    // get totalCBM() {
    //     var total = 0;
    //     if (this.data.measurements) {
    //         this.data.measurements.map((m)=>{
    //             if (m.length && m.width && m.height && m.cartonsQuantity) {
    //                 total += (m.length * m.width * m.height * m.cartonsQuantity / 1000000);
    //             }
    //         })
    //     }
    //     return total.toLocaleString('en-EN', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
    // }

    // get totalCartons() {
    //     let result = 0;
    //     if (this.data.items) {
    //         for (var item of this.data.items) {
    //             if (item.details) {
    //                 const newDetails = item.details.map(d => {
    //                     return {
    //                         carton1: d.carton1,
    //                         carton2: d.carton2,
    //                         cartonQuantity: d.cartonQuantity,
    //                         index: d.index
    //                     };
    //                 }).filter((value, i, self) => self.findIndex(f => value.carton1 == f.carton1 && value.carton2 == f.carton2 && value.index == f.index) === i);
                    
    //                 for (var detail of newDetails) {
    //                     const cartonExist = false;
    //                     const indexItem = this.data.items.indexOf(item);
    //                     if (indexItem > 0) {
    //                         for (let i = 0; i < indexItem; i++) {
    //                             const item = this.data.items[i];
    //                             for (const prevDetail of item.details) {
    //                                 if (detail.carton1 == prevDetail.carton1 && detail.carton2 == prevDetail.carton2 && detail.index == prevDetail.index) {
    //                                     cartonExist = true;
    //                                     break;
    //                                 }
    //                             }
    //                         }
    //                     }
    //                     if (!cartonExist) {
    //                         result += detail.cartonQuantity;
    //                     }
    //                 }
    //             }
    //         }
    //         this.data.totalCartons = result;
    //         return this.data.totalCartons;
    //     }
    // }

    totalQty() {
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
        this.totalQuantities= result.join(" / ");
    }
}
